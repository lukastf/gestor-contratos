import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';
import styles from '../cadastro/Cadastro.css';

const converterFloat = (str:any) => {

  console.log(str);
  str = str.toString();

  str = str.replace(".", "");
  str = str.replace(",", "");
  
  str = str.substring(0,str.length-2)+"."+str.substring(str.length-2);
  str = parseFloat(str);
  if (isNaN(str)) str = "";
  return str;
}

const addVirgula = (str: any) => {

  str = str.toString();
  str = str.replace(".", ",");
  return str;
}

const valorTotalCalc = (state:any) => {

  state.valorEquipamentoPecas = converterFloat(state.valorEquipamentoPecas);
  state.valorDeslocamento = converterFloat(state.valorDeslocamento);
  state.valorHoraTecnica = converterFloat(state.valorHoraTecnica);
  state.valorOutros = converterFloat(state.valorOutros);

  state.valorTotal = state.valorEquipamentoPecas + state.valorDeslocamento + state.valorHoraTecnica + state.valorOutros;

  state.valorEquipamentoPecas = addVirgula(state.valorEquipamentoPecas);
  state.valorDeslocamento = addVirgula(state.valorDeslocamento);
  state.valorHoraTecnica = addVirgula(state.valorHoraTecnica);
  state.valorOutros = addVirgula(state.valorOutros);

  state.valorTotal = addVirgula(state.valorTotal);

  console.log(state.valorTotal);
}

const ordemServicoSlice = createSlice({
  name: 'ordemServico',
  initialState: { 

    hideListarOrdemServico: styles.inputs,
    hideNovaOrdemServico: styles.dNone,
    hideAlterarOrdemServico: styles.dNone,
    hideEncerrarOrdemServico: styles.dNone,

    _id:"",

    codigo: "20",
    dataChamado: "",
    dataAtendimento: "",

    tipoServico: "INSTALAÇÃO",
    tipoCaptura: "POS MAQUINA",

    posMaqNrAtual: "",
    posMaqNrAnterior: "",

    defeitoReclamado: "",
    servicosPrestados: "",

    kmInicial: "",
    kmFinal: "",

    horaTecnicaInicio: "",
    horaTecnicaFinal: "",

    posWeb: "VENDA/CANCELAMENTO/SALDO",
    posMaquina: "VENDA/CANCELAMENTO",

    valorEquipamentoPecas: "",
    valorDeslocamento: "",
    valorHoraTecnica: "",
    valorOutros: "",
    valorTotal: "",

    btnInserirText: "Novo"
    
  },
  reducers: {

    // mostrar e esconder
    hideListarOrdemServico: (state) => {state.hideListarOrdemServico = styles.dNone;},
    showListarOrdemServico: (state) => {state.hideListarOrdemServico = styles.inputs;},

    hideNovaOrdemServico: (state) => {state.hideNovaOrdemServico = styles.dNone;},
    showNovaOrdemServico: (state) => {state.hideNovaOrdemServico = styles.inputs;},

    hideAlterarOrdemServico: (state) => {state.hideAlterarOrdemServico = styles.dNone;},
    showAlterarOrdemServico: (state) => {state.hideAlterarOrdemServico = styles.inputs;},

    hideEncerrarOrdemServico: (state) => {state.hideEncerrarOrdemServico = styles.dNone;},
    showEncerrarOrdemServico: (state) => {state.hideEncerrarOrdemServico = styles.inputs;},

    // varaveis de entrada

    setCodigo: (state, value) => {

      state.codigo = value.payload;
    },

    setDataChamado: (state, value) => {

      state.dataChamado = value.payload;
    },

    setDataAtendimento: (state, value) => {

      state.dataAtendimento = value.payload;
    },

    setTipoServico: (state, value) => {

      state.tipoServico = value.payload;
    },
    setTipoCapura: (state, value) => {

      state.tipoCaptura = value.payload;
    },
    setPosMaqNrAtual: (state, value) => {

      state.posMaqNrAtual = value.payload;
    },
    setPosMaqNrAnterior: (state, value) => {

      state.posMaqNrAnterior = value.payload;
    },
    setDefeitoReclamado: (state, value) => {

      state.defeitoReclamado = value.payload;
    },
    setServicosPrestados: (state, value) => {
      state.servicosPrestados = value.payload;
    },
    setKmInicial: (state, value) => {
      state.kmInicial = value.payload;
    },
    setKmFinal: (state, value) => {
      state.kmFinal = value.payload;
    },
    setHoraTecnicaInicio: (state, value) => {
      state.horaTecnicaInicio = value.payload;
    },
    setHoraTecnicaFinal: (state, value) => {
      state.horaTecnicaFinal = value.payload;
    },
    setPosWeb: (state, value) => {
      state.posWeb = value.payload;
    },
    setPosMaquina: (state, value) => {
      state.posMaquina = value.payload;
    },

    setValorEquipamentoPecas: (state, value) => {
      state.valorEquipamentoPecas = value.payload;
      valorTotalCalc(state);
    },

    setValorDeslocamento: (state, value) => {
      state.valorDeslocamento = value.payload;
      valorTotalCalc(state);
    },

    setValorHoraTecnica: (state, value) => {
      state.valorHoraTecnica = value.payload;
      valorTotalCalc(state);
    },
    
    setValorOutros: (state, value) => {
      state.valorOutros = value.payload;
      valorTotalCalc(state);
    },
    
    setValorTotal: (state, value) => {
      state.valorTotal = value.payload;
    },

    resetForm: (state) => {

      state.hideListarOrdemServico = styles.inputs;
      state.hideNovaOrdemServico = styles.dNone;
      state.hideAlterarOrdemServico = styles.dNone;
      state.hideEncerrarOrdemServico = styles.dNone;

      state._id = "";

      state.codigo = "20";
      state.dataChamado = "";
      state.dataAtendimento = "";

      state.tipoServico = "INSTALAÇÃO";
      state.tipoCaptura = "POS MAQUINA";

      state.posMaqNrAtual = "";
      state.posMaqNrAnterior = "";

      state.defeitoReclamado = "";
      state.servicosPrestados = "";

      state.kmInicial = "";
      state.kmFinal = "";

      state.horaTecnicaInicio = "";
      state.horaTecnicaFinal = "";

      state.posWeb = "VENDA/CANCELAMENTO/SALDO";
      state.posMaquina = "VENDA/CANCELAMENTO";

      state.valorEquipamentoPecas = "";
      state.valorDeslocamento = "";
      state.valorHoraTecnica = "";
      state.valorOutros = "";
      state.valorTotal = "";

      state.btnInserirText = "Novo";
    },

    setOrdemServico: (state, value) => {

      state._id = value.payload._id;

      state.codigo = value.payload.codigo;
      state.dataChamado = value.payload.dataChamado;
      state.dataAtendimento = value.payload.dataAtendimento;

      state.tipoServico = value.payload.tipoServico;
      state.tipoCaptura = value.payload.tipoCaptura;

      state.posMaqNrAtual = value.payload.posMaqNrAtual;
      state.posMaqNrAnterior = value.payload.posMaqNrAnterior;

      state.defeitoReclamado = value.payload.defeitoReclamado;
      state.servicosPrestados = value.payload.servicosPrestados;

      state.kmInicial = value.payload.kmInicial;
      state.kmFinal = value.payload.kmFinal;

      state.horaTecnicaInicio = value.payload.horaTecnicaInicio;
      state.horaTecnicaFinal = value.payload.horaTecnicaFinal;

      state.posWeb = value.payload.posWeb;
      state.posMaquina = value.payload.posMaquina;

      state.valorEquipamentoPecas = value.payload.valorEquipamentoPecas;
      state.valorDeslocamento = value.payload.valorDeslocamento;
      state.valorHoraTecnica = value.payload.valorHoraTecnica;
      state.valorOutros = value.payload.valorOutros;
      state.valorTotal = value.payload.valorTotal;

      state.btnInserirText = "Editar";
    }
  },
});

export const { 

  hideListarOrdemServico,
  showListarOrdemServico,
  hideNovaOrdemServico,
  showNovaOrdemServico,
  hideAlterarOrdemServico,
  showAlterarOrdemServico,
  hideEncerrarOrdemServico,
  showEncerrarOrdemServico,

  setCodigo,
  setDataChamado,
  setDataAtendimento,

  setTipoServico,
  setTipoCapura,
  setPosMaqNrAtual,
  setPosMaqNrAnterior,
  setDefeitoReclamado,
  setServicosPrestados,
  setKmInicial,
  setKmFinal,
  setHoraTecnicaInicio,
  setHoraTecnicaFinal,
  setPosWeb,
  setPosMaquina,

  setValorEquipamentoPecas,
  setValorDeslocamento,
  setValorHoraTecnica,
  setValorOutros,
  setValorTotal,

  resetForm,
  setOrdemServico

} = ordemServicoSlice.actions;

export default ordemServicoSlice.reducer;

const selectHideListarOrdemServico = (state: RootState) => state.ordemServico.hideListarOrdemServico;
const selectHideNovaOrdemServico = (state: RootState) => state.ordemServico.hideNovaOrdemServico;
const selectHideAlterarOrdemServico = (state: RootState) => state.ordemServico.hideAlterarOrdemServico;
const selectHideEncerrarOrdemServico = (state: RootState) => state.ordemServico.hideEncerrarOrdemServico;

const selectId = (state: RootState) => state.ordemServico._id;

const selectCodigo = (state: RootState) => state.ordemServico.codigo;
const selectDataChamado = (state: RootState) => state.ordemServico.dataChamado;
const selectDataAtendimento = (state: RootState) => state.ordemServico.dataAtendimento;

const selectTipoServico = (state: RootState) => state.ordemServico.tipoServico;
const selectTipoCaptura = (state: RootState) => state.ordemServico.tipoCaptura;
const selectPosMaqNrAtual = (state: RootState) => state.ordemServico.posMaqNrAtual;
const selectPosMaqNrAnterior = (state: RootState) => state.ordemServico.posMaqNrAnterior;
const selectDefeitoReclamado = (state: RootState) => state.ordemServico.defeitoReclamado;
const selectServicosPrestados = (state: RootState) => state.ordemServico.servicosPrestados;

const selectKmInicial = (state: RootState) => state.ordemServico.kmInicial;
const selectKmFinal = (state: RootState) => state.ordemServico.kmFinal;
const selectHoraTecnicaInicio = (state: RootState) => state.ordemServico.horaTecnicaInicio;
const selectHoraTecnicaFinal = (state: RootState) => state.ordemServico.horaTecnicaFinal;
const selectPosWeb = (state: RootState) => state.ordemServico.posWeb;
const selectPosMaquina = (state: RootState) => state.ordemServico.posMaquina;

const selectValorEquipamentoPecas = (state: RootState) => state.ordemServico.valorEquipamentoPecas;
const selectValorDeslocamento = (state: RootState) => state.ordemServico.valorDeslocamento;
const selectValorHoraTecnica = (state: RootState) => state.ordemServico.valorHoraTecnica;
const selectValorOutros = (state: RootState) => state.ordemServico.valorOutros;
const selectValorTotal = (state: RootState) => state.ordemServico.valorTotal;

const selectBtnInserirText = (state: RootState) => state.ordemServico.btnInserirText;

export {

  selectHideListarOrdemServico,
  selectHideNovaOrdemServico,
  selectHideAlterarOrdemServico,
  selectHideEncerrarOrdemServico,

  selectId,

  selectCodigo,
  selectDataChamado,
  selectDataAtendimento,

  selectTipoServico,
  selectTipoCaptura,
  selectPosMaqNrAtual,
  selectPosMaqNrAnterior,
  selectDefeitoReclamado,
  selectServicosPrestados,

  selectKmInicial,
  selectKmFinal,
  selectHoraTecnicaInicio,
  selectHoraTecnicaFinal,
  selectPosWeb,
  selectPosMaquina,

  selectValorEquipamentoPecas,
  selectValorDeslocamento,
  selectValorHoraTecnica,
  selectValorOutros,
  selectValorTotal,

  selectBtnInserirText

}
