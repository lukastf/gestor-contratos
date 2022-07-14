import React, { useState } from 'react';
import styles from './Cadastro.css';
import { useSelector, useDispatch } from 'react-redux';
import {

  selectHideCondicoes,
  selectValorImplantacao,
  selectValorMensal,
  selectValorTotal,
  selectValorJuros,
  selectVigencia,
  selectDataInicial,
  selectDataFinal,

  setValorImplantacao,
  setValorMensal,
  setValorTotal,
  setValorJuros,
  setVigencia,
  setDataInicial,
  setDataFinal

} from './condicoesSlice'

export default function Condicoes(): JSX.Element {

  // form

  const dispatch = useDispatch();

  const hideCondicoes = useSelector(selectHideCondicoes);

  const valorImplantacao = useSelector(selectValorImplantacao);
  const valorMensal = useSelector(selectValorMensal);
  const valorTotal = useSelector(selectValorTotal);
  const valorJuros = useSelector(selectValorJuros);
  const vigencia = useSelector(selectVigencia);
  const dataInicial = useSelector(selectDataInicial);
  const dataFinal = useSelector(selectDataFinal);

  return (
    <div className={hideCondicoes}>
      <h1>Condições</h1>
      <div>
        <label>Valor Implantação:</label>
        <input 
          type="text" 
          className={styles.input} 
          value={valorImplantacao}
          onChange={(e: any) => dispatch(setValorImplantacao(e.target.value))} 
        />
      </div>
      <div>
        <label style={{marginRight: "3rem"}}>Valor Mensal:</label>
        <input 
          type="text" 
          className={styles.input}
          value={valorMensal}
          onChange={(e: any) => dispatch(setValorMensal(e.target.value))} />
      </div>
      <div>
        <label style={{marginRight: "0.5rem"}}>Vigência (meses):</label>
        <input 
          type="text" 
          className={styles.input} 
          value={vigencia} 
          onChange={(e: any) => dispatch(setVigencia(e.target.value))} 
        />
      </div>
      <div>
        <label style={{marginRight: "4.5rem"}}>Valor Total:</label>
        <input 
          type="text" 
          className={styles.input} 
          value={valorTotal}
          onChange={(e: any) => dispatch(setValorTotal(e.target.value))}
        />
      </div>
      <div>
        <label style={{marginRight: "4rem"}}>Data Inicial:</label>
        <input 
          type="text" 
          className={styles.input} 
          placeholder="DD/MM/AA" 
          value={dataInicial}
          onChange={(e: any) => dispatch(setDataInicial(e.target.value))} />
      </div>
      <div>
        <label style={{marginRight: "4.5rem"}}>Data Final:</label>
        <input 
          type="text" 
          className={styles.input} 
          placeholder="DD/MM/AA"
          value={dataFinal} 
          onChange={(e: any) => dispatch(setDataFinal(e.target.value))} />
      </div>
      <div>
        <label style={{marginRight: "4rem"}}>Valor Juros:</label>
        <input 
          type="text" 
          className={styles.input} 
          value={valorJuros}
          onChange={(e: any) => dispatch(setValorJuros(e.target.value))}
        />
      </div>
    </div>
  );
}
