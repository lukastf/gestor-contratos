import React, { useState } from 'react';
//import styles from './Cadastro.css';
import { useSelector, useDispatch } from 'react-redux';
import DirectMongo from '../../directMongo/DirectMongo';
import {
  selectCodigoCadastro
} from '../cadastro/dadosJuridicosSlice';

//import axios from 'axios';

import {
  selectHideListarOrdemServico
} from './ordemServicoSlice';

import styles from './ListarOrdensServico.css'
import stylesCad from '../cadastro/Cadastro.css';

export default function DadosJuridicos(): JSX.Element {

  const hideListarOrdemServico = useSelector(selectHideListarOrdemServico);
  const codigoCadastro = useSelector(selectCodigoCadastro);

  let itensPage = 6;
  //let search = "$";
  let search = codigoCadastro;
  let [searchProp, setSearchProp] = useState("codigoCadastro");

  //let displayPages = useState<any>([]);
  //let paginasIds = useState<any>([]);
  let displayPages:string[] = [];
  let paginasIds:string[] = [];

  const [listaOrdemServico, setListaOrdemServico] = useState<Array<JSX.Element>>([]);
  const [paginas, setPaginas] = useState<Array<JSX.Element>>([]);
  //const [paginaIndex, setPaginaIndex] = useState(0);

  const [check, setCheck] = useState(false);

  const objMongo = (pageId:any = undefined) => {

    return (
      {
        itensPage: itensPage,
        search: search,
        searchProp: searchProp,
        pageId: pageId
      }
    )
  }

  const getOrdensServicos = async (pageId:any) => {

    let obj = objMongo(pageId);

    const dm = new DirectMongo();
    let os = await dm.getMany("ordemServicos", obj);
    if (os === null) os = [];

    //setPaginas(osPages);
    //setPaginaIndex(p.length);

    let temp = [];

    for (let i = 0; i < os.length; i++) {

      temp.push(
      <tr>
        <td>{os[i].codigoCadastro}</td>
        <td>{os[i].razaoSocial}</td>
        <td>{os[i].codigo}</td>
        <td>{os[i].dataChamado}</td>
        <td>{os[i].valorTotal}</td>
      </tr>
      );
    }

    setListaOrdemServico(temp);
  }

  const pagesConstructor = (index:number) => {

    let temp = [];

    for(let i = 0; i < paginasIds.length; i++) {

      displayPages[i] = styles.dNone;
      
      if (
        i === 0 || 
        i === index - 2 || 
        i === index - 1 || 
        i === index + 1 || 
        i === index + 2 || 
        i === paginasIds.length -1 
      ) displayPages[i] = "";

      if(i === index) displayPages[i] = styles.active;

      temp.push(<a onClick={(e:any) => paginationChange(e, i)} id={paginasIds[i]} className={displayPages[i]}>{i+1}</a>);
    }

    setPaginas(temp);

  }

  const getPages = async () => {

    let obj = objMongo();

    const dm = new DirectMongo();
    let osPages = await dm.getManyPagination("ordemServicos", obj);
    if (osPages === null) osPages = [];
    //setPaginasIds(osPages);
    paginasIds = osPages;
    
    pagesConstructor(0);
    getOrdensServicos(osPages[0]);
  }

  if (!check) {

    setCheck(true);
    getPages();
    console.log("rambo");
    //console.log(cnpj);
  }

  const paginationChange = (e:any, index:any) => {

    let pageId = e.target.id;

    pagesConstructor(index);
    getOrdensServicos(pageId);
  }

  //console.log(hideListarOrdemServico)
  //if (hideListarOrdemServico === stylesCad.inputs) getPages();
  //else console.log("ww");

  return (
    <div className={hideListarOrdemServico}>
      <h1>Listar</h1>
      <div className={styles.pagination}>
        <a >&laquo;</a>
          {paginas}
        <a >&raquo;</a>
      </div>
      <table>
        <thead>
          <tr>
            <th>Codigo Cadastro</th>
            <th>Razão Social</th>
            <th>Codigo</th>
            <th>Data Chamado</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tfoot>
          {listaOrdemServico}
        </tfoot>
      </table>
    </div>
  );
}
