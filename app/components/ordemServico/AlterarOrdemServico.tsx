
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectHideAlterarOrdemServico,
    setOrdemServico
} from './ordemServicoSlice';

import styles from '../cadastro/Cadastro.css';

import DirectMongo from '../../directMongo/DirectMongo';
import OrdemServicoForm from './OrdemServicoForm';


export default function AlterarOrdemServico(): JSX.Element {

    const dispatch = useDispatch();

    const hideAlterarOrdemServico = useSelector(selectHideAlterarOrdemServico);

    const [pesquisa, setPesquisa] = useState("");
    const [hideShowForm, sethideShowForm] = useState(styles.dNone);

    const pesquisarCodigo = async () => {

        sethideShowForm(styles.dNone);

        const dm = new DirectMongo();
        const result = await dm.getOne("ordemServicos", {codigo:pesquisa});

        result._id = result._id.toString();

        if (result !== null) {
            sethideShowForm("");
            dispatch(setOrdemServico(result));
        }
    }

    return(
        <div className={hideAlterarOrdemServico}>
            <div style={{display: "flex"}}>
                <label style={{marginTop: "1.5rem"}}>Codigo:</label>
                <input 
                type="text" 
                className={styles.input}
                value={pesquisa} 
                onChange={(e: any) => setPesquisa(e.target.value)}
                />
                <div style={{marginTop: "1rem"}}>
                    <button style={{padding: "0.8rem"}} onClick={pesquisarCodigo}>Pesquisar</button>
                </div>
            </div>
            <div className={hideShowForm}>
                <OrdemServicoForm />
            </div>
        </div>
    )
}