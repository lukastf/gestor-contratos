import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from '../cadastro/Cadastro.css';
import AlterarOrdemServico from './AlterarOrdemServico';
import EncerrarOrdemServico from './EncerrarOrdemServico';

import ListarOrdensServico from './ListarOrdensServico';
import NovaOrdemServico from './NovaOrdemServico';
import { 
  showListarOrdemServico,
  hideNovaOrdemServico, 
  hideAlterarOrdemServico,
  hideEncerrarOrdemServico,
  hideListarOrdemServico,
  showNovaOrdemServico,
  showAlterarOrdemServico,
  showEncerrarOrdemServico,
  resetForm
} from './ordemServicoSlice';

export default function OrdemServico(): JSX.Element {

  const dispatch = useDispatch();

  /*
  const [btnDadosJuridicos, setBtnDadosJuridicos] = useState(styles.btnSelected);
  const [btnCondicoes, setBtnCondicoes] = useState(styles.btn);
  const [btnDadosContato, setBtnDadosContato] = useState(styles.btn);*/

  const [btnSelecionado, setBtnSelecionado] = useState([styles.btnSelected, styles.btn, styles.btn, styles.btn]);

  const [listar, setListar] = useState(<ListarOrdensServico />);
  const [nova, setNova] = useState(<NovaOrdemServico />);
  const [alterar, setAlterar] = useState(<AlterarOrdemServico />);
  const [encerrar, setEncerrar] = useState(<EncerrarOrdemServico />);

  const setBtn = (index:number) => {

    let temp = [];

    for (let i = 0; i < btnSelecionado.length; i++) {

      if (index === i) temp.push(styles.btnSelected);
      else temp.push(styles.btn);
    }

    setBtnSelecionado(temp);
  }

  const showListarF = () => {

    setListar(<ListarOrdensServico />);
    setNova(<></>);
    setAlterar(<></>);
    setEncerrar(<></>);

    dispatch(showListarOrdemServico());
    dispatch(hideNovaOrdemServico());
    dispatch(hideAlterarOrdemServico());
    dispatch(hideEncerrarOrdemServico());


    setBtn(0);
  }

  const showNovaOSF = () => {

    setListar(<></>);
    setNova(<NovaOrdemServico />);
    setAlterar(<></>);
    setEncerrar(<></>);

    dispatch(resetForm());

    dispatch(hideListarOrdemServico());
    dispatch(showNovaOrdemServico());
    dispatch(hideAlterarOrdemServico());
    dispatch(hideEncerrarOrdemServico());

    setBtn(1);
  }

  const alterarOSF = () => {

    setListar(<></>);
    setNova(<></>);
    setAlterar(<AlterarOrdemServico />);
    setEncerrar(<></>);

    dispatch(hideListarOrdemServico());
    dispatch(hideNovaOrdemServico());
    dispatch(showAlterarOrdemServico());
    dispatch(hideEncerrarOrdemServico());

    setBtn(2);
  }

  const encerrarOSF = () => {

    setListar(<></>);
    setNova(<></>);
    setAlterar(<></>);
    setEncerrar(<EncerrarOrdemServico />);

    dispatch(hideListarOrdemServico());
    dispatch(hideNovaOrdemServico());
    dispatch(hideAlterarOrdemServico());
    dispatch(showEncerrarOrdemServico());

    setBtn(3);
  }

  return (
    <>
    <div className={styles.backButton} data-tid="backButton">
      <Link to={routes.HOME} onClick={showListarF}>
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
    </div>
    <h1 className={styles.titulo}>
      Ordem de Servico
    </h1>
    <div className={styles.container2}>
      <div className={styles.painelLeft}>
        {/*<InserirBanco {...props} />*/}
        <div><button className={btnSelecionado[0]} onClick={showListarF}>Listar</button></div>
        <div><button className={btnSelecionado[1]} onClick={showNovaOSF}>Nova O.S</button></div>
        <div><button className={btnSelecionado[2]} onClick={alterarOSF}>Alterar O.S</button></div>
        <div><button className={btnSelecionado[3]} onClick={encerrarOSF}>Encerrar O.S</button></div>
        {/*<Logo {...props}/>*/}
      </div>
      <div className={styles.mainContent}>
        {listar}
        {nova}
        {alterar}
        {encerrar}
      </div>
    </div>
    </>
  );
}