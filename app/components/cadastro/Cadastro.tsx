import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Cadastro.css';
import { useDispatch } from 'react-redux';
import DadosJuridicos from './DadosJuridicos'
import Condicoes from './Condicoes'
import DadosContato from './DadosContato'
import {
  hideDadosJuridicos,
  showDadosJuridicos
} from './dadosJuridicosSlice'

import {
  hideCondicoes,
  showCondicoes
} from './condicoesSlice'

import {
  hideDadosContato,
  showDadosContato
} from './dadosContatoSlice'

import InserirBanco from './InserirBanco';
import Logo from './Logo';

export default function Cadastro(): JSX.Element {

  //const [hideDadosJuridicos, setHideDadosJuridicos] = useState(styles.inputs);
  //const [hideCondicoes, setHideCondicoes] = useState(styles.dNone);
  //const [hideDadosContato, setHideDadosContato] = useState(styles.dNone);

  const dispatch = useDispatch();

  const [btnDadosJuridicos, setBtnDadosJuridicos] = useState(styles.btnSelected);
  const [btnCondicoes, setBtnCondicoes] = useState(styles.btn);
  const [btnDadosContato, setBtnDadosContato] = useState(styles.btn);

  const showDadosJuridicosF = () => {

    dispatch(showDadosJuridicos());
    dispatch(hideCondicoes());
    dispatch(hideDadosContato());

    setBtnDadosJuridicos(styles.btnSelected);
    setBtnCondicoes(styles.btn);
    setBtnDadosContato(styles.btn);
  }

  const showCondicoesF = () => {

    dispatch(hideDadosJuridicos());
    dispatch(showCondicoes());
    dispatch(hideDadosContato());

    setBtnDadosJuridicos(styles.btn);
    setBtnCondicoes(styles.btnSelected);
    setBtnDadosContato(styles.btn);
  }

  const showDadosContatoF = () => {

    dispatch(hideDadosJuridicos());
    dispatch(hideCondicoes());
    dispatch(showDadosContato());

    setBtnDadosJuridicos(styles.btn);
    setBtnCondicoes(styles.btn);
    setBtnDadosContato(styles.btnSelected);
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
      Cadastro Cliente
    </h1>
    <div className={styles.container2}>
      <div className={styles.painelLeft}>
        <InserirBanco {...props} />
        <div><button className={btnDadosJuridicos} onClick={showDadosJuridicosF}>Dados Juridicos</button></div>
        {/*<div><button className={btnCondicoes} onClick={showCondicoesF}>Condições</button></div>*/}
        <div><button className={btnDadosContato} onClick={showDadosContatoF}>Dados Contato</button></div>
        <Logo {...props}/>
      </div>
      <div className={styles.mainContent}>
        <DadosJuridicos />
        <Condicoes />
        <DadosContato />
      </div>
    </div>
    </>
  );
}
