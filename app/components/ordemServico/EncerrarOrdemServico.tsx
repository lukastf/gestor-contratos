
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectHideEncerrarOrdemServico
} from './ordemServicoSlice';

import styles from '../cadastro/Cadastro.css';
import DirectMongo from '../../directMongo/DirectMongo';

import styles2 from './OrdemServico.css';

export default function EncerrarOrdemServico(): JSX.Element {

    const dispatch = useDispatch();

    const hideEncerrarOrdemServico = useSelector(selectHideEncerrarOrdemServico);

    const [pesquisa, setPesquisa] = useState("");
    const [hideShowForm, sethideShowForm] = useState(styles.dNone);

    const [codigo, setCodigo] = useState();
    const [dataChamado, setDataChamado] = useState();
    const [valorTotal, setValorTotal] = useState();

    const pesquisarCodigo = async () => {

        sethideShowForm(styles.dNone);

        const dm = new DirectMongo();
        const result = await dm.getOne("ordemServicos", {codigo:pesquisa});

        result._id = result._id.toString();

        if (result !== null) {
            sethideShowForm("");
            //dispatch(setOrdemServico(result));
            setCodigo(result.codigo);
            setDataChamado(result.dataChamado);
            setValorTotal(result.valorTotal);
        }
    }

    return(
        <div className={hideEncerrarOrdemServico}>
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
                <p>Codigo: {codigo}</p>
                <p>Data Chamado: {dataChamado}</p>
                <p>Valor Total: {valorTotal}</p>
                <div className={styles2.btn}>
                <button /*onClick={inserirBanco}*/ >Encerrar</button>
                </div>
            </div>
        </div>
    )
}