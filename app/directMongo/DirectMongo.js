
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

class DirectMongo {

    constructor(connection = {user: "root", password: "easeShop123", db: "gestorContratos"}) {

        this.connection = connection;
    }
    
    async getDatabase () {
    
        try {
    
            const db = await MongoClient.connect(
                "mongodb://"+ this.connection.user +":"+ this.connection.password +"@localhost:27017/", 
            { useNewUrlParser: true, useUnifiedTopology: true });
            
            const close = () => {
                try {
                    return db.close()
                } catch (e) {
                    console.log(e);
                }
            }
        
            const obj = {
        
                db: db.db(this.connection.db),
                close: close
            } 
        
            return obj;
    
        } catch (e) {
    
            console.log("can't connect");
            return null;
        }
    }

    async createSearchObj (params) {

        let keys = Object.keys(params);

        let obj = {}; 

        for (let i = 0; i < keys.length; i++ ) {

            if (keys[i] === "pageId") obj._id = {$lte: ObjectId(params.pageId)};
            else if (keys[i] === "search") {
                if (params.search === "$") continue;
                obj[params.searchProp] = new RegExp(params.search, "ig");
            }
            else if (keys[i] === "searchIntervalProp") obj[params.searchIntervalProp] = {$gt: params.intervalBegin, $lt: params.intervalEnd};
            else if (keys[i] === "searchExact1") obj[params.searchExactProp1] = params.searchExact1;
            else if (keys[i] === "searchExact2") obj[params.searchExactProp2] = params.searchExact2;
            else if (keys[i] === "searchExact3") obj[params.searchExactProp3] = params.searchExact3;
            else if (keys[i] === "searchExact4") obj[params.searchExactProp4] = params.searchExact4;
            else if (keys[i] === "searchExact5") obj[params.searchExactProp5] = params.searchExact5;
        }

        return obj;
    }

    async getOne (collection, obj) {

        const objDb = await this.getDatabase();
        const db = objDb.db;
        
        try {
    
            if (typeof obj._id !== "undefined") obj = { _id: ObjectId(obj._id) }
            let res = await db.collection(collection).findOne(obj);
    
            return res;
    
        } catch (e) {
    
            console.log(e);
            return null;
            
        } finally {
    
            objDb.close();
        }
    }

    async getMany (collection, params) {

        const objDb = await this.getDatabase();
        const db = objDb.db;
    
        try {
    
            let itensPage = parseInt(params.itensPage);
            let obj = await this.createSearchObj(params);
        
            return await db.collection(collection)
                            .find(obj)
                            .sort({_id:-1})
                            //.project({carrinho:0, favoritos:0, senha:0})
                            .limit(itensPage)
                            .toArray();
    
        } catch (e) {
    
            console.log(e);
            return null;
    
        } finally {
    
            objDb.close();
        }
    }

    async getManyPagination (collection, params) {

        const objDb = await this.getDatabase();
        const db = objDb.db;
    
        try {
    
            let itensPageControle = parseInt(params.itensPage);
            let obj = await this.createSearchObj(params);
    
            const res = await db.collection(collection)
                                .find(obj)
                                .sort({_id:-1})
                                .project({_id:1})
                                .toArray();
    
            if (res.length === 0) return null;
    
            let pagination = [];
            let itensPage = 0;
    
            pagination.push(res[0]._id);
    
            for (let i = 0; i < res.length; i ++) {
    
                if (itensPage == itensPageControle) {
    
                    itensPage = 0;
                    pagination.push(res[i]._id);
                }
    
                itensPage++;
            }
    
            return pagination;
    
        } catch (e) {
    
            console.log(e);
            return null;
            
        } finally {
    
            objDb.close();
        }
    }

    async postOne (collection, obj) {

        const objDb = await this.getDatabase();
        const db = objDb.db;
        
        try {
    
            delete obj._id;
    
            return await db.collection(collection).insertOne(obj);
    
        } catch (e) {
    
            console.log(e);
            return null;
    
        } finally {
    
            objDb.close();
        }
    }

    async putOne (collection, obj) {

        const objDb = await this.getDatabase();
        const db = objDb.db;
    
        try {
    
            obj._id = ObjectId(obj._id);
    
            return await db.collection(collection).updateOne({ "_id":obj._id }, {$set: obj});
    
        } catch (e) {
    
            console.log(e);
            return null;
    
        } finally {
            objDb.close();
        }
    }

    async deleteOne (collection, obj) {

        const objDb = await this.getDatabase();
        const db = objDb.db;
    
        try {
    
            obj = { _id: ObjectId(obj._id) }
    
            return await db.collection(collection).deleteOne(obj);
    
        } catch (e) {
    
            console.log(e);
            return null;
            
        } finally {
    
            objDb.close();
        }
    }
}

module.exports = DirectMongo;