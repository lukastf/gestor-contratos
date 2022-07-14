import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';
import styles from './Cadastro.css';

const counterSlice = createSlice({
  name: 'cadastro',
  initialState: { 

    hideDadosJuridicos: styles.inputs,

    _id:"",

    logo: "",

    cnpj: "",
    razaoSocial: "",
    endereco: "",
    cidade: "",
    cep: "",
    codigoCadastro: ""
  },
  reducers: {

    hideDadosJuridicos: (state) => {
      state.hideDadosJuridicos = styles.dNone;
    },

    showDadosJuridicos: (state) => {
      state.hideDadosJuridicos = styles.inputs;
    },

    setCnpj: (state, value) => {
      state.cnpj = value.payload;
    },
    setRazaoSocial: (state, value) => {
      state.razaoSocial = value.payload;
    },
    setEndereco: (state, value) => {
      state.endereco = value.payload;
    },
    setCidade: (state, value) => {
      state.cidade = value.payload;
    },
    setCep: (state, value) => {
      state.cep = value.payload;
    },
    setCodigoCadastro: (state, value) => {
      state.codigoCadastro = value.payload;
    },
    
    resetForm: (state) => {

      state.hideDadosJuridicos = styles.inputs;

      state._id = "";
      state.logo = "";
      state.cnpj = "";
      state.razaoSocial = "";
      state.endereco = "";
      state.cidade = "";
      state.cep = "";
      state.codigoCadastro = "";
    },

    setDadosJuridicos: (state, value) => {

      state._id  = value.payload._id;
      state.logo = value.payload.logo;
      state.cnpj = value.payload.cnpj;
      state.razaoSocial = value.payload.razaoSocial;
      state.endereco = value.payload.endereco;
      state.cidade = value.payload.cidade;
      state.cep = value.payload.cep;
      state.codigoCadastro = value.payload.codigoCadastro;
    }
  },
});

export const { 

  hideDadosJuridicos,
  showDadosJuridicos,

  setCnpj,
  setRazaoSocial,
  setEndereco,
  setCidade,
  setCep,
  setCodigoCadastro,

  resetForm,
  setDadosJuridicos

} = counterSlice.actions;

export default counterSlice.reducer;

const selectHideDadosJuridicos = (state: RootState) => state.dadosJuridicos.hideDadosJuridicos;

const selectId = (state: RootState) => state.dadosJuridicos._id;
const selectLogo = (state: RootState) => state.dadosJuridicos.logo;

const selectCnpj = (state: RootState) => state.dadosJuridicos.cnpj;
const selectRazaoSocial = (state: RootState) => state.dadosJuridicos.razaoSocial;
const selectEndereco = (state: RootState) => state.dadosJuridicos.endereco;
const selectCidade = (state: RootState) => state.dadosJuridicos.cidade;
const selectCep = (state: RootState) => state.dadosJuridicos.cep;
const selectCodigoCadastro = (state: RootState) => state.dadosJuridicos.codigoCadastro;

export {

  selectHideDadosJuridicos,

  selectId,
  selectLogo,
  
  selectCnpj,
  selectRazaoSocial,
  selectEndereco,
  selectCidade,
  selectCep,
  selectCodigoCadastro
}