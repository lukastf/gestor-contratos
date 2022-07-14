import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';
import styles from './Cadastro.css';

const valorTotalCalc = (state:any) => {

  state.valorMensal = parseInt(state.valorMensal);
  if (isNaN(state.valorMensal)) state.valorMensal = "";

  state.vigencia = parseInt(state.vigencia);
  if (isNaN(state.vigencia)) state.vigencia = "";

  state.valorImplantacao = parseInt(state.valorImplantacao);
  if (isNaN(state.valorImplantacao)) state.valorImplantacao = "";

  state.valorTotal = state.vigencia * state.valorMensal + state.valorImplantacao;

  state.valorJuros = state.valorTotal * 0.195;
}

const counterSlice = createSlice({
  name: 'cadastro',
  initialState: { 

    hideCondicoes: styles.dNone,

    valorImplantacao: "",
    valorMensal: "",
    valorTotal: "",
    valorJuros: "",
    vigencia: "12",
    dataInicial: "",
    dataFinal: ""
  },
  reducers: {

    hideCondicoes: (state) => {
      state.hideCondicoes = styles.dNone;
    },

    showCondicoes: (state) => {
      state.hideCondicoes = styles.inputs;
    },

    setValorImplantacao: (state, value) => {

      state.valorImplantacao = value.payload;
      valorTotalCalc(state);
    },
    setValorMensal: (state, value) => {

      state.valorMensal = value.payload;
      valorTotalCalc(state);
    },
    setValorTotal: (state, value) => {

      state.valorTotal = value.payload;
      //valorTotalCalc(state);
    },
    setValorJuros: (state, value) => {

      state.valorJuros = value.payload;
    },
    setVigencia: (state, value) => {

      state.vigencia = value.payload;
      valorTotalCalc(state);
    },
    setDataInicial: (state, value) => {
      state.dataInicial = value.payload;
    },
    setDataFinal: (state, value) => {
      state.dataFinal = value.payload;
    },

    resetForm: (state) => {

      state.hideCondicoes = styles.dNone;

      state.valorImplantacao = "";
      state.valorMensal = "";
      state.valorTotal = "";
      state.valorJuros = "";
      state.vigencia = "12";
      state.dataInicial = "";
      state.dataFinal = "";

    },

    setCondicoes: (state, value) => {

      state.valorImplantacao = value.payload.valorImplantacao;
      state.valorMensal = value.payload.valorMensal;
      state.valorTotal = value.payload.valorTotal;
      state.valorJuros = value.payload.valorJuros;
      state.vigencia = value.payload.vigencia;
      state.dataInicial = value.payload.dataInicial;
      state.dataFinal = value.payload.dataFinal;
    }
  },
});

export const { 

  hideCondicoes,
  showCondicoes,

  setValorImplantacao,
  setValorMensal,
  setValorTotal,
  setValorJuros,
  setVigencia,
  setDataInicial,
  setDataFinal,

  resetForm,
  setCondicoes

} = counterSlice.actions;

export default counterSlice.reducer;

const selectHideCondicoes = (state: RootState) => state.condicoes.hideCondicoes;

const selectValorImplantacao = (state: RootState) => state.condicoes.valorImplantacao;
const selectValorMensal = (state: RootState) => state.condicoes.valorMensal;
const selectValorTotal = (state: RootState) => state.condicoes.valorTotal;
const selectValorJuros = (state: RootState) => state.condicoes.valorJuros;
const selectVigencia = (state: RootState) => state.condicoes.vigencia;
const selectDataInicial = (state: RootState) => state.condicoes.dataInicial;
const selectDataFinal = (state: RootState) => state.condicoes.dataFinal;


export {

  selectHideCondicoes,

  selectValorImplantacao,
  selectValorMensal,
  selectValorTotal,
  selectValorJuros,
  selectVigencia,
  selectDataInicial,
  selectDataFinal
}
