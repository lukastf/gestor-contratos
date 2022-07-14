import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from '../cadastro/Cadastro.css';
import { useDispatch } from 'react-redux';
import DadosJuridicos from '../cadastro/DadosJuridicos';
import Condicoes from '../cadastro/Condicoes';
import DadosContato from '../cadastro/DadosContato';
import {
  hideDadosJuridicos,
  showDadosJuridicos
} from '../cadastro/dadosJuridicosSlice';

import {
  hideCondicoes,
  showCondicoes
} from '../cadastro/condicoesSlice';

import {
  hideDadosContato,
  showDadosContato
} from '../cadastro/dadosContatoSlice';

import InserirBanco from '../cadastro/InserirBanco';
import Logo from '../cadastro/Logo';

export default function Contratos(): JSX.Element {

  //const [hideDadosJuridicos, setHideDadosJuridicos] = useState(styles.inputs);
  //const [hideCondicoes, setHideCondicoes] = useState(styles.dNone);
  //const [hideDadosContato, setHideDadosContato] = useState(styles.dNone);

  const dispatch = useDispatch();

  const [btnCondicoes, setBtnCondicoes] = useState(styles.btnSelected);

  const [check, setCheck] = useState(false);

  const showCondicoesF = () => {

    dispatch(hideDadosJuridicos());
    dispatch(showCondicoes());
    dispatch(hideDadosContato());

    setBtnCondicoes(styles.btnSelected);
  }

  if (!check) {
    setCheck(true);
    showCondicoesF();
  }

  const [imageValue, setImageValue] = useState();
  const [image, setImage] = useState(Object);
  const [imageUrl, setImageUrl] = useState(Object);

  let props = {

    imageValue: imageValue,
    setImageValue: setImageValue,

    image: image,
    setImage: setImage,

    imageUrl: imageUrl,
    setImageUrl: setImageUrl
  }

  // form

  return (
    <>
    <div className={styles.backButton} data-tid="backButton">
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
    </div>
    <h1 className={styles.titulo}>
      Contratos
    </h1>
    <div className={styles.container2}>
      <div className={styles.painelLeft}>
        <InserirBanco {...props}/>
        <div><button className={btnCondicoes} onClick={showCondicoesF}>Condições</button></div>
        <Logo {...props}/>
      </div>
      <div className={styles.mainContent}>
        <Condicoes />
      </div>
    </div>
    </>
  );
}