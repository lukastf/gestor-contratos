import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Home.css';
import ListarClientes from './ListarClientes';

import { useSelector, useDispatch } from 'react-redux';

import {
  selectId
} from '../cadastro/dadosJuridicosSlice';

export default function Home(): JSX.Element {

  const _id = useSelector(selectId);

  //const [routeContratoState, setRouteContratoState] = useState("");

  //const [check, setchek] = useState(false);

  let contratos = "";
  let ordemServico = "";

  if (_id !== "") {
    contratos = routes.CONTRATOS;
    ordemServico = routes.ORDEM_SERVICO;
  }
  else {
    contratos = "";
    ordemServico = "";
  }

  /*if (!check) {

    setchek(true);
    
    if (_id !== "") setRouteContratoState(routes.CONTRATOS);
    else setRouteContratoState("");
  }*/
  

  return (
    <>
    <div className={styles.container} data-tid="container">
      <h2>Gestor de Contratos</h2>
      <div className={styles.painelTop}>
        <Link to={routes.CADASTRO}>Cadastro</Link>
        <Link to={contratos}>Contratos</Link>
        <Link to={routes.RELATORIOS}>Relatórios</Link>
        <Link to={routes.BALANCO}>Balanço</Link>
      </div>
    </div>
    <div className={styles.container2}>
      <div className={styles.painelLeft}>
        <div>
          <h3>Lançar</h3>
        </div>
        <div>
          <Link to={ordemServico}>Ordem de Serviço</Link>
        </div>
        <div>
          <Link to={routes.DESPESAS}>Despesas</Link>
        </div>
        <div>
          <Link to={routes.NFE}>NFE</Link>
        </div>
        <div>
          <Link to={routes.CONSULTE_NFE}>Consulte NFE</Link>
        </div>
        <div>
          <Link to={routes.PAGAMENTO}>Pagamento</Link>
        </div>
      </div>
      <div className={styles.mainContent}>
        <ListarClientes />
      </div>
    </div>
    </>
  );
}
