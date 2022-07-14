
import React, {useState, useEffect} from 'react';
import styles from './Home.css';
import DirectMongo from '../../directMongo/DirectMongo';
import { useSelector, useDispatch } from 'react-redux';
import { setDadosJuridicos, resetForm as resetDadosJuridicos } from '../cadastro/dadosJuridicosSlice';
import { setDadosContato, resetForm as resetDadosContato } from '../cadastro/dadosContatoSlice';
import { setCondicoes, resetForm as resetCondicoes } from '../cadastro/condicoesSlice';
//import { setCelular } from '../cadastro/dadosContatoSlice';

export default function ListarClientes(): JSX.Element {

    const dispatch = useDispatch();

    const [prefSelec, setPrefSelect] = useState("");
    const [check, setCheck] = useState(false);

    const [paginas, setPaginas] = useState<Array<string>>([]);

    let [clientes, setClientes] = useState<Array<JSX.Element>>([]);
    const [clientesRender, setClientesRender] = useState<JSX.Element>();

    const [scrollLimit, setScrollLimit] = useState(90);
    const [paginaIndex, setPaginaIndex] = useState(0);

    //const [itensPage] = useState(5);
    //const [search, setSearch] = useState("$");

    let zimer = "";

    let itensPage = 5;
    let search = "$";
    let [searchProp, setSearchProp] = useState("cnpj");

    const selecionarCliente = (e: any) => {
        
        if (zimer === e.cnpj) {
            setPrefSelect("");
            zimer = "";

            dispatch(resetDadosJuridicos());
            dispatch(resetCondicoes());
            dispatch(resetDadosContato());
            return;
        }
        
        zimer = e.cnpj;
        setPrefSelect(e.cnpj);

        dispatch(setDadosJuridicos(e));
        dispatch(setCondicoes(e));
        dispatch(setDadosContato(e));
    }

    const criarClientesBase = (c : any) => {

        let temp = [];

        for (let i = 0; i < c.length; i++) {

            c[i]._id = c[i]._id.toString();

            temp.push(
            <div>
                <p>{c[i].codigoCadastro}</p>
                <img src={"src/logos/" + c[i].logo} className={styles.logo} 
                onClick={() => selecionarCliente(c[i])} />
                <p>{c[i].razaoSocial}</p>
            </div>
            );
        }

        let temp2 = clientes;

        temp2.push(
        <div className={styles.logos}>
            {temp}
        </div>
        );

        setClientes(temp2);
        setClientesRender(<>{temp2}</>);
    }

    const criarClientes = async (search:string, pageId:any) => {

        let obj = {
            itensPage: itensPage,
            search: search,
            searchProp: searchProp,
            pageId: pageId
        }

        //if(paginas !== null) obj.pageId = paginas[pageId];
        const dm = new DirectMongo();
        let c = await dm.getMany("clientes", obj);
        criarClientesBase(c);
    }

    const limparLista = async () => {
        
        setPaginas([]);

        clientes = [];
        
        //setClientes([]);
        setClientesRender(<></>);

        setScrollLimit(90);
        setPaginaIndex(0);
    }

    const listar = async (search:string) => {

        console.log(searchProp);

        let obj = {
            itensPage: itensPage,
            search: search,
            searchProp: searchProp,
            pageId: undefined
        }

        const dm = new DirectMongo();

        let p = await dm.getManyPagination("clientes", obj);
        if (p === null) p = [];

        setPaginas(p);
        setPaginaIndex(p.length);

        for (let i = 0; i < p.length; i++) {

            if (i > 2) {
                setPaginaIndex(i);
                break;
            }
            await criarClientes(search, p[i]);
        }

        //}, [clientesRender, clientes, paginas])

        //criarClientes(search, p[1]);
        //criarClientes(search, p[2]);
        //criarClientes(search, p[3]);
    }

    if (!check) {

        setCheck(true);

        dispatch(resetDadosJuridicos());
        dispatch(resetCondicoes());
        dispatch(resetDadosContato());
        
        listar(search);
    }

    const pesquisar = async (e: any) => {

        limparLista();

        let val = e.target.value;

        if (val === "") val = "$";

        //search = val;
        //ListarClientes();
        listar(val);
    }

    const scroll = (e : any) => {

        if (e.target.scrollTop > scrollLimit) {

            if(paginaIndex > paginas.length - 1) return;

            criarClientes(search, paginas[paginaIndex]);
            
            setPaginaIndex(paginaIndex + 1);
            setScrollLimit(scrollLimit + 200);
        }
    }

    const pesquisarPor = (e:any) => {

        //searchProp = e.target.value;
        setSearchProp(e.target.value)
    }

    return(
        <>
        <div className={styles.pesquisarGroup}>
            <input type="text" className={styles.pesquisar} onChange={pesquisar} name="firstname" placeholder="Pesquisar.." />
            <p>Pesquisar por:</p>
            <div>
                <input type="radio" name="psq" value="cnpj" onClick={pesquisarPor}  defaultChecked/>
                <label>cnpj</label>
                <input type="radio" name="psq" value="razaoSocial" onClick={pesquisarPor}/>
                <label>Razão Social</label>
                <input type="radio" name="psq" value="codigoCadastro" onClick={pesquisarPor} />
                <label>Codigo Cadastro</label>
            </div>
        </div>
        <h2>Cliente selecionado: {prefSelec} </h2>
        <div className={styles.logosContainer} onScroll={scroll}>
            {clientesRender}
        </div>
        </>
    )
}