import React, { useState } from 'react';
import DirectMongo from '../../directMongo/DirectMongo';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Cadastro.css';
import fs from 'fs';

import {
    selectId,
    selectLogo,
    selectCnpj,
    selectRazaoSocial,
    selectCidade,
    selectEndereco,
    selectCep,
    selectCodigoCadastro,
    resetForm as resetDadosJuridicos
} from './dadosJuridicosSlice';
  
import {
    selectValorImplantacao,
    selectValorMensal,
    selectValorTotal,
    selectValorJuros,
    selectVigencia,
    selectDataInicial,
    selectDataFinal,
    resetForm as resetCondicoes
} from './condicoesSlice';
  
import {
    selectNomeGestor,
    selectTelefone,
    selectEmail,
    selectCelular,
    resetForm as resetDadosContato
} from './dadosContatoSlice';

export default function InserirBanco(props:any): JSX.Element { 

    const [btnInserirText, setBtnInserirText] = useState("Novo");

    const clearImage = () => {

        props.setImageValue(undefined);
        props.setImage(Object);
        props.setImageUrl(Object);
    };

    const dispatch = useDispatch();

    const _id = useSelector(selectId);

    const logo = useSelector(selectLogo);

    const cnpj = useSelector(selectCnpj);
    const razaoSocial = useSelector(selectRazaoSocial);
    const endereco = useSelector(selectEndereco);
    const cidade = useSelector(selectCidade);
    const cep = useSelector(selectCep);
    const codigoCadastro = useSelector(selectCodigoCadastro);

    const valorImplantacao = useSelector(selectValorImplantacao);
    const valorMensal = useSelector(selectValorMensal);
    const valorTotal = useSelector(selectValorTotal);
    const valorJuros = useSelector(selectValorJuros);
    const vigencia = useSelector(selectVigencia);
    const dataInicial = useSelector(selectDataInicial);
    const dataFinal = useSelector(selectDataFinal);

    const nomeGestor = useSelector(selectNomeGestor);
    const telefone = useSelector(selectTelefone);
    const celular = useSelector(selectCelular);
    const email = useSelector(selectEmail);


    const inserirBanco = () => {

        let l = logo;

        if (typeof props.image !== "undefined" && typeof props.image.path !== "undefined") {

            let extensao = "." + props.image.type.split("/")[1];
            l = cnpj + extensao;

            fs.copyFile(props.image.path, "./app/src/logos/"+ logo, function (err) {
                if (err) throw err;
                //res.write('File uploaded and moved!');
                //res.end();
            });
        }


        let obj = {

            _id:_id,

            logo: l,

            cnpj: cnpj,
            razaoSocial: razaoSocial,
            endereco: endereco,
            cidade: cidade,
            cep: cep,
            codigoCadastro: codigoCadastro,

            valorImplantacao: valorImplantacao,
            valorMensal: valorMensal,
            valorTotal: valorTotal,
            valorJuros: valorJuros,
            vigencia: vigencia,
            dataInicial: dataInicial,
            dataFinal: dataFinal,

            nomeGestor: nomeGestor,
            telefone: telefone,
            celular: celular,
            email: email
        }


        //if (logo === "") delete obj.logo;
        
        const dm = new DirectMongo();

        if (_id === "") {
            dm.postOne("clientes", obj);
        } else {
            dm.putOne("clientes", obj);
        }
        
    
    
        return;
        clearImage();

        
    
        dispatch(resetDadosJuridicos());
        dispatch(resetCondicoes());
        dispatch(resetDadosContato());
    }

    const [check, setCheck] = useState(false);

    if (!check) {

        setCheck(true);

        if (_id !== "") {

            //let file = "src/logos/4fsdsdf.png"

            //setImageValue(e.target.value);
            //setImage(e.target.files[0]);
            props.setImageUrl("src/logos/"+logo);
            setBtnInserirText("Editar");
        }
    }

    
    return(
        <>
        <div>
            <button className={styles.btn} onClick={inserirBanco}>{btnInserirText}</button>
        </div>
        </>
    );
}