import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectRazaoSocial,
  selectCidade,
  selectEndereco, selectCodigoCadastro
} from '../cadastro/dadosJuridicosSlice';

import {
    selectEmail,
    selectNomeGestor,
    selectTelefone
} from '../cadastro/dadosContatoSlice';
import DirectMongo from '../../directMongo/DirectMongo';

import {
  selectId,
  selectDefeitoReclamado,
  selectHoraTecnicaFinal, 
  selectHoraTecnicaInicio, 
  selectKmFinal, 
  selectKmInicial, 
  selectPosMaqNrAnterior, 
  selectPosMaqNrAtual, 
  selectServicosPrestados, 
  selectValorDeslocamento, 
  selectValorEquipamentoPecas, 
  selectValorHoraTecnica, 
  selectValorOutros, 
  setDefeitoReclamado, 
  setHoraTecnicaFinal, 
  setHoraTecnicaInicio, 
  setKmFinal, 
  setKmInicial, 
  setPosMaqNrAnterior, 
  setPosMaqNrAtual, 
  setPosMaquina, 
  setPosWeb, 
  setServicosPrestados, 
  setTipoCapura, 
  setTipoServico, 
  setValorDeslocamento, 
  setValorEquipamentoPecas, 
  setValorHoraTecnica, 
  setValorOutros,
  setCodigo,
  setDataChamado,
  setDataAtendimento,
  selectCodigo,
  selectDataChamado,
  selectDataAtendimento,
  selectValorTotal,
  setValorTotal,
  selectBtnInserirText
} from './ordemServicoSlice';

import styles from '../cadastro/Cadastro.css';
import styles2 from './OrdemServico.css';
//import { selectValorTotal, setValorTotal } from '../cadastro/condicoesSlice';

export default function OrdemServicoForm(): JSX.Element {

  // form

  const dispatch = useDispatch();

  //const hideDadosJuridicos = useSelector(selectHideDadosJuridicos);
  const codigoCadastro = useSelector(selectCodigoCadastro);
  const razaoSocial = useSelector(selectRazaoSocial);
  const endereco = useSelector(selectEndereco);
  const cidade = useSelector(selectCidade);

  const telefone = useSelector(selectTelefone);
  const nomeGestor = useSelector(selectNomeGestor);
  const email = useSelector(selectEmail);

  const _id = useSelector(selectId);

  const codigo = useSelector(selectCodigo);
  const dataChamado = useSelector(selectDataChamado);
  const dataAtendimento = useSelector(selectDataAtendimento);

  const posMaqNrAtual = useSelector(selectPosMaqNrAtual);
  const posMaqNrAnterior = useSelector(selectPosMaqNrAnterior);
  const defeitoReclamado = useSelector(selectDefeitoReclamado);
  const servicosPrestados = useSelector(selectServicosPrestados);
  const kmInicial = useSelector(selectKmInicial);
  const kmFinal = useSelector(selectKmFinal);
  const horaTecnicaInicio = useSelector(selectHoraTecnicaInicio);
  const horaTecnicaFinal = useSelector(selectHoraTecnicaFinal);
  const valorEquipamentoPecas = useSelector(selectValorEquipamentoPecas);
  const valorDeslocamento = useSelector(selectValorDeslocamento);
  const valorHoraTecnica = useSelector(selectValorHoraTecnica);
  const valorOutros = useSelector(selectValorOutros);
  const valorTotal = useSelector(selectValorTotal);

  const btnInserirText = useSelector(selectBtnInserirText);

  const tipoServico = (e:any) => {

    //searchProp = e.target.value;
    //setSearchProp(e.target.value)
    dispatch(setTipoServico(e.target.value));
  }

  const tipoCaptura = (e:any) => {

    dispatch(setTipoCapura(e.target.value));
  }

  const posweb = (e:any) => {

    dispatch(setPosWeb(e.target.value));
  }

  const posMaquina = (e:any) => {

    dispatch(setPosMaquina(e.target.value));
  }

  /*const [btnInserirText, setBtnInserirText] = useState("Novo");
  const [check, setCheck] = useState(false);

  if (!check) {

    setCheck(true);
    if (_id !== "") setBtnInserirText("Editar");
  }*/

  const inserirBanco = () => {

    let obj = {
      _id: _id,
      codigoCadastro: codigoCadastro,
      razaoSocial: razaoSocial,
      endereco: endereco,
      cidade: cidade,

      telefone: telefone,
      nomeGestor: nomeGestor,
      email: email,

      codigo: codigo,
      dataChamado: dataChamado,
      dataAtendimento: dataAtendimento,

      posMaqNrAtual: posMaqNrAtual,
      posMaqNrAnterior: posMaqNrAnterior,
      defeitoReclamado: defeitoReclamado,
      servicosPrestados: servicosPrestados,
      kmInicial: kmInicial,
      kmFinal: kmFinal,
      horaTecnicaInicio: horaTecnicaInicio,
      horaTecnicaFinal: horaTecnicaFinal,

      valorEquipamentoPecas: valorEquipamentoPecas,
      valorDeslocamento: valorDeslocamento,
      valorHoraTecnica: valorHoraTecnica,
      valorOutros: valorOutros,
      valorTotal:valorTotal
    }

    const dm = new DirectMongo();

    if (_id === "") {
      dm.postOne("ordemServicos", obj);
    } else {
      dm.putOne("ordemServicos", obj);
    }
  }

  return (
    <>
      <div className={styles2.scroll}>

        <p>Codigo de Cadastro: {codigoCadastro}</p>
        <p>Razão Social: {razaoSocial}</p>
        <p>Endereço: {endereco}</p>
        <p>Telefone: {telefone}</p>
        <p>Solicitante e Email: {nomeGestor} - {email}</p>
        <p>Cidade: {cidade}</p>

        <div>
          <label style={{marginRight:"8rem"}}>Codigo:</label>
          <input 
            type="text" 
            className={styles.input}
            value={codigo} 
            onChange={(e: any) => dispatch(setCodigo(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight:"1.7rem"}}>Data do chamado:</label>
          <input 
            type="text" 
            className={styles.input}
            value={dataChamado} 
            onChange={(e: any) => dispatch(setDataChamado(e.target.value))}
          />
        </div>

        <div>
          <label>Data do atendimento:</label>
          <input 
            type="text" 
            className={styles.input}
            value={dataAtendimento} 
            onChange={(e: any) => dispatch(setDataAtendimento(e.target.value))}
          />
        </div>

        <div>
          <p>Tipo de Serviço:</p>
          <input type="radio" name="tipoServico" value="INSTALAÇÃO" onClick={tipoServico}  defaultChecked/>
          <label>INSTALAÇÃO</label>
          <input type="radio" name="tipoServico" value="MANUTENÇÃO" onClick={tipoServico}/>
          <label>MANUTENÇÃO</label>
          <input type="radio" name="tipoServico" value="TREINAMENTO" onClick={tipoServico} />
          <label>TREINAMENTO</label>
        </div>

        <div style={{marginBottom: "2rem"}}>
          <p>Tipo de Captura:</p>
          <input type="radio" name="tipoCaptura" value="POS MAQUINA" onClick={tipoCaptura}  defaultChecked/>
          <label>POS MAQUINA</label>
          <input type="radio" name="tipoCaptura" value="POS WEB" onClick={tipoCaptura}/>
          <label>POS WEB</label>
          <input type="radio" name="tipoCaptura" value="TEF" onClick={tipoCaptura} />
          <label>TEF</label>
        </div>

        <div>
          <label style={{marginRight: "2.7rem"}}>POS MAQ.NR ATUAL:</label>
          <input 
            type="text" 
            className={styles.input}
            value={posMaqNrAtual} 
            onChange={(e: any) => dispatch(setPosMaqNrAtual(e.target.value))}
          />
        </div>
        
        <div>
          <label>POS MAQ.NR ANTERIOR:</label>
          <input 
            type="text" 
            className={styles.input}
            value={posMaqNrAnterior} 
            onChange={(e: any) => dispatch(setPosMaqNrAnterior(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "1rem"}}>DEFEITO RECLAMADO:</label>
          <input 
            type="text" 
            className={styles.input}
            value={defeitoReclamado} 
            onChange={(e: any) => dispatch(setDefeitoReclamado(e.target.value))}
          />
        </div>

        <div>
          <label>SERVIÇOS PRESTADOS:</label>
          <input 
            type="text" 
            className={styles.input}
            value={servicosPrestados} 
            onChange={(e: any) => dispatch(setServicosPrestados(e.target.value))}
          />
        </div>

        <div>  
          <label style={{marginRight: "8rem"}}>KM INICIAL:</label>
          <input 
            type="text" 
            className={styles.input}
            value={kmInicial} 
            onChange={(e: any) => dispatch(setKmInicial(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "9rem"}}>KM FINAL:</label>
          <input 
            type="text" 
            className={styles.input}
            value={kmFinal} 
            onChange={(e: any) => dispatch(setKmFinal(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "1rem"}}>HORA TECNICA INICIO:</label>
          <input 
            type="text" 
            className={styles.input}
            value={horaTecnicaInicio} 
            onChange={(e: any) => dispatch(setHoraTecnicaInicio(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "1rem"}}>HORA TECNICA FINAL:</label>
          <input 
            type="text" 
            className={styles.input}
            value={horaTecnicaFinal} 
            onChange={(e: any) => dispatch(setHoraTecnicaFinal(e.target.value))}
          />
        </div>

        <div>
          <p>POS WEB:</p>
          <input type="radio" name="posweb" value="VENDA/CANCELAMENTO/SALDO" onClick={posweb}  defaultChecked/>
          <label>VENDA/CANCELAMENTO/SALDO</label>
          <input type="radio" name="posweb" value="IMPRESSÃO E REIMPRESSÃO" onClick={posweb}/>
          <label>IMPRESSÃO E REIMPRESSÃO</label>
          <input type="radio" name="posweb" value="RELATÓRIO DE VENDA" onClick={posweb} />
          <label>RELATÓRIO DE VENDA</label>
        </div>

        <div style={{marginBottom: "2rem"}}>
          <p>POS MAQUINA:</p>
          <input type="radio" name="posMaquina" value="VENDA/CANCELAMENTO" onClick={posMaquina}  defaultChecked/>
          <label>VENDA/CANCELAMENTO</label>
          <input type="radio" name="posMaquina" value="REIMPRESSÃO DE VENDA" onClick={posMaquina}/>
          <label>REIMPRESSÃO DE VENDA</label>
        </div>

        <div>
          <label>VALOR EQUIPAMENTO/PEÇAS (R$):</label>
          <input 
            type="text" 
            className={styles.input}
            value={valorEquipamentoPecas} 
            onChange={(e: any) => dispatch(setValorEquipamentoPecas(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "3.3rem"}}>VALOR DESLOCAMENTO (R$):</label>
          <input 
            type="text" 
            className={styles.input}
            value={valorDeslocamento} 
            onChange={(e: any) => dispatch(setValorDeslocamento(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "4.5rem"}}>VALOR HORA TECNICA (R$):</label>
          <input 
            type="text" 
            className={styles.input}
            value={valorHoraTecnica} 
            onChange={(e: any) => dispatch(setValorHoraTecnica(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "8.5rem"}}>VALOR OUTROS (R$):</label>
          <input 
            type="text" 
            className={styles.input}
            value={valorOutros} 
            onChange={(e: any) => dispatch(setValorOutros(e.target.value))}
          />
        </div>

        <div>
          <label style={{marginRight: "10rem"}}>VALOR TOTAL (R$):</label>
          <input 
            type="text" 
            className={styles.input}
            value={valorTotal} 
            onChange={(e: any) => dispatch(setValorTotal(e.target.value))}
          />
        </div>
        
        <div className={styles2.btn}>
          <button onClick={inserirBanco}>{btnInserirText}</button>
        </div>
      </div>
    </>
  );
}