import React from 'react';
import { useSelector } from 'react-redux';
import OrdemServicoForm from './OrdemServicoForm';

import {
  selectHideNovaOrdemServico
} from './ordemServicoSlice';

export default function NovaOrdemServico(): JSX.Element {

  const hideNovaOrdemServico = useSelector(selectHideNovaOrdemServico);

  return (
    <div className={hideNovaOrdemServico}>
      <OrdemServicoForm />
    </div>
  );
}