import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';
import styles from './Cadastro.css';

const counterSlice = createSlice({
  name: 'cadastro',
  initialState: {

    hideDadosContato: styles.dNone,

    nomeGestor: "",
    telefone: "",
    celular: "",
    email: ""
  },
  reducers: {

    hideDadosContato: (state) => {
      state.hideDadosContato = styles.dNone;
    },

    showDadosContato: (state) => {
      state.hideDadosContato = styles.inputs;
    },

    setNomeGestor: (state, value) => {
      state.nomeGestor = value.payload;
    },
    setTelefone: (state, value) => {
      state.telefone = value.payload;
    },
    setCelular: (state, value) => {
      state.celular = value.payload;
    },
    setEmail: (state, value) => {
      state.email = value.payload;
    },
    resetForm: (state) => {

      state.hideDadosContato = styles.dNone;

      state.nomeGestor = "";
      state.telefone = "";
      state.celular = "";
      state.email = "";
    },

    setDadosContato: (state, value) => {

      state.nomeGestor = value.payload.nomeGestor;
      state.telefone = value.payload.telefone;
      state.celular = value.payload.celular;
      state.email = value.payload.email;
    }
  },
});

export const { 

  hideDadosContato,
  showDadosContato,

  setNomeGestor,
  setTelefone,
  setCelular,
  setEmail,

  resetForm,
  setDadosContato

} = counterSlice.actions;

export default counterSlice.reducer;

const selectHideDadosContato = (state: RootState) => state.dadosContrato.hideDadosContato;

const selectNomeGestor = (state: RootState) => state.dadosContrato.nomeGestor;
const selectTelefone = (state: RootState) => state.dadosContrato.telefone;
const selectCelular = (state: RootState) => state.dadosContrato.celular;
const selectEmail = (state: RootState) => state.dadosContrato.email;

export {

  selectHideDadosContato,

  selectNomeGestor,
  selectTelefone,
  selectCelular,
  selectEmail,
}