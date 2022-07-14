import React, { useState } from 'react';
import styles from './Cadastro.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCnpj,
  selectCnpj,
  selectRazaoSocial,
  selectCidade,
  selectEndereco,
  selectCep,
  selectHideDadosJuridicos,
  selectCodigoCadastro,
  setRazaoSocial,
  setEndereco,
  setCidade,
  setCep,
  setCodigoCadastro
} from './dadosJuridicosSlice';

import axios from 'axios';

export default function DadosJuridicos(): JSX.Element {

  // form

  const dispatch = useDispatch();

  const hideDadosJuridicos = useSelector(selectHideDadosJuridicos);

  const cnpj = useSelector(selectCnpj);
  const razaoSocial = useSelector(selectRazaoSocial);
  const endereco = useSelector(selectEndereco);
  const cidade = useSelector(selectCidade);
  const cep = useSelector(selectCep);
  const codigoCadastro = useSelector(selectCodigoCadastro);

  const cnpjHandler = (e: any) =>  {

    let val = e.target.value;

    //console.log(e.target.value);

    dispatch(setCnpj(val));

    if (val.length > 13) {

      //let res = await 
      axios.get("https://www.receitaws.com.br/v1/cnpj/"+ val)
      .then((res)=>{

        console.log(res.data);

        dispatch(setRazaoSocial(res.data.nome));
        dispatch(setEndereco(res.data.bairro + " " + res.data.logradouro + " " + res.data.numero));
        dispatch(setCidade(res.data.municipio));
        dispatch(setCep(res.data.cep));

        /*
        state.razaoSocial = res.data.nome;
        state.endereco = res.data.bairro + " " + res.data.logradouro + " " + res.data.numero
        state.cidade = res.data.municipio;
        state.cep = res.data.cep;*/
      })
    
    }

  }

  return (
    <div className={hideDadosJuridicos}>
      <h1>Dados juridicos</h1>
      <input 
        type="text" 
        className={styles.input} 
        placeholder="Cnpj"
        value={cnpj} 
        onChange={cnpjHandler} 
      />

      <input 
        type="text" 
        className={styles.input} 
        placeholder="Razão Social" 
        value={razaoSocial}
        onChange={(e: any) => dispatch(setRazaoSocial(e.target.value))} 
      />

      <input 
        type="text" 
        className={styles.input} 
        placeholder="Endereço" 
        value={endereco}
        onChange={(e: any) => dispatch(setEndereco(e.target.value))} 
      />

      <input 
        type="text" 
        className={styles.input} 
        placeholder="Cidade" 
        value={cidade}
        onChange={(e: any) => dispatch(setCidade(e.target.value))} 
      />

      <input 
        type="text" 
        className={styles.input} 
        placeholder="Cep" 
        value={cep}
        onChange={(e: any) => dispatch(setCep(e.target.value))} 
      />

      <input 
        type="text" 
        className={styles.input} 
        placeholder="Codigo de Cadastro" 
        value={codigoCadastro}
        onChange={(e: any) => dispatch(setCodigoCadastro(e.target.value))}
      />
    </div>
  );
}
