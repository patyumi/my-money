import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';

import { MdDateRange } from 'react-icons/md';

const minAno = 2019;
const maxAno = 2022;

const AdicionarMes = () => {
  const refAno = useRef();
  const refMes = useRef();
  const [redir, setRedir] = useState('');
  const anos = [];
  const meses = [];

  for (let i = minAno; i <= maxAno; i++){
    anos.push(i);
  }

  for (let i = 1; i <= 12; i++){
    meses.push(i);
  }

  const zeroPad = num => {
    if(num < 10)
    {
      return '0'+num;
    }
    return num;
  }

  const verMes = () => {
    console.log('ok');
    setRedir(refAno.current.value + '-' + refMes.current.value);
  }

  if(redir !== ''){
    return <Redirect to={'/movimentacoes/'+redir} />;
  }

  return (
    <div className="d-flex align-items-center justify-content-between px-5 flex-fill w-100 my-3 text-dark-50 rounded shadow-sm" style={{ backgroundColor: '#FFF'}}>
      <h3 className="font-weight-normal">
        <MdDateRange className="mr-3"/>
        Visão Geral
      </h3>
      <div className="d-inline-flex flex-row align-items-center justify-content-center p-2">

      <form class="form-inline">
        <label className="my-1 mr-2">Novo Mês</label>
        <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" ref={refAno}>
          { anos.map(ano => <option key={ano} value={ano}>{ano}</option>)}
        </select>
        <select className="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" ref={refMes}>
          { meses.map(zeroPad).map(mes => <option key={mes} value={mes}>{mes}</option>)}
        </select>

        <button type="button" className="btn btn-dark my-1" onClick={verMes} title="Salvar novo mês">Salvar</button>
      </form>

      </div>
    </div>
  );
}

export default AdicionarMes;
