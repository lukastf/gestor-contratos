import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import styles from './Relatorios.css';

export default function Relatorios(): JSX.Element {

  return (
    <>
    <div className={styles.backButton} data-tid="backButton">
      <Link to={routes.HOME}>
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
    </div>
    <h1>
      Relatorios
    </h1>
    </>
  );
}