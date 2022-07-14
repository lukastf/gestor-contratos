import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
// eslint-disable-next-line import/no-cycle
import counterReducer from './features/counter/counterSlice';
import dadosJuridicosReducer from './components/cadastro/dadosJuridicosSlice';
import condicoesReducer from './components/cadastro/condicoesSlice';
import dadosContratoReducer from './components/cadastro/dadosContatoSlice';
import ordemServicoReducer from './components/ordemServico/ordemServicoSlice';

//import cadastroReducer from './components/cadastro/cadastroSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    dadosJuridicos:dadosJuridicosReducer,
    condicoes:condicoesReducer,
    dadosContrato:dadosContratoReducer,
    ordemServico:ordemServicoReducer
    //cadastro: cadastroReducer
  });
}
