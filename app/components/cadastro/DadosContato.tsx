import React, { useState } from 'react';
import styles from './Cadastro.css';
import { useSelector, useDispatch } from 'react-redux';
import {

  selectHideDadosContato,
  selectNomeGestor,
  selectTelefone,
  selectCelular,
  selectEmail,

  setNomeGestor,
  setTelefone,
  setCelular,
  setEmail

} from './dadosContatoSlice'

export default function DadosContato(): JSX.Element {

  // form

  const dispatch = useDispatch();

  const hideDadosContato = useSelector(selectHideDadosContato);

  const nomeGestor = useSelector(selectNomeGestor);
  const telefone = useSelector(selectTelefone);
  const celular = useSelector(selectCelular);
  const email = useSelector(selectEmail);

  return (
    <div className={hideDadosContato}>
      <h1>Dados de Contato</h1>
      <div>
        <label>Nome do Gestor:</label>
        <input 
          type="text" 
          className={styles.input} 
          value={nomeGestor}
          onChange={(e: any) => dispatch(setNomeGestor(e.target.value))}
        />
      </div>
      <div>
        <label style={{marginRight: "4.5rem"}}>Telefone:</label>
        <input 
          type="text" 
          className={styles.input}
          value={telefone} 
          onChange={(e: any) => dispatch(setTelefone(e.target.value))}
        />
      </div>
      <div>
        <label style={{marginRight: "5.5rem"}}>Celular:</label>
        <input 
            type="text" 
            className={styles.input} 
            value={celular}
            onChange={(e: any) => dispatch(setCelular(e.target.value))}
          />
      </div>
      <div>
        <label style={{marginRight: "6.5rem"}}>Email:</label>
        <input 
          type="text" 
          className={styles.input} 
          value={email}
          onChange={(e: any) => dispatch(setEmail(e.target.value))}
        />
      </div>
    </div>
  );
}
