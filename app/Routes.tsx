/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const LazyCadastroPage = React.lazy(() =>
  import('./containers/CadastroPage')
);

const LazyContratosPage = React.lazy(() =>
  import('./containers/ContratosPage')
);

const LazyRelatoriosPage = React.lazy(() =>
  import('./containers/RelatoriosPage')
);

const LazyBalancoPage = React.lazy(() =>
  import('./containers/BalancoPage')
);

const LazyOrdemServicoPage = React.lazy(() =>
  import('./containers/OrdemServicoPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

const Cadastro = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCadastroPage {...props} />
  </React.Suspense>
);

const Contratos = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyContratosPage {...props} />
  </React.Suspense>
);

const Relatorios = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyRelatoriosPage {...props} />
  </React.Suspense>
);

const Balanco = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyBalancoPage {...props} />
  </React.Suspense>
);

const OrdemServico = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyOrdemServicoPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.CADASTRO} component={Cadastro} />
        <Route path={routes.CONTRATOS} component={Contratos} />
        <Route path={routes.RELATORIOS} component={Relatorios} />
        <Route path={routes.BALANCO} component={Balanco} />
        <Route path={routes.ORDEM_SERVICO} component={OrdemServico} />

        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
