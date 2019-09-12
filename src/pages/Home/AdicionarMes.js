import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";

const minAno = 2019;
const maxAno = 2022;

const AdicionarMes = () => {
  const refAno = useRef();
  const refMes = useRef();
  const [redir, setRedir] = useState("");
  const anos = [];
  const meses = [];

  for (let i = minAno; i <= maxAno; i++) {
    anos.push(i);
  }

  for (let i = 1; i <= 12; i++) {
    meses.push(i);
  }

  const zeroPad = num => {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  };

  const verMes = () => {
    setRedir(refAno.current.value + "-" + refMes.current.value);
  };

  if (redir !== "") {
    return <Redirect to={"/movimentacoes/" + redir} />;
  }

  return (
    <div className="col col-md-2 p-0">
      <div className="bg-warning rounded p-2 pl-4">
        <h5 className="font-weight-bold">Adicionar mês</h5>
      </div>

      <div className="bg-light my-2 p-4 rounded">
        <form>
          <div className="form-group">
            <label className="font-weight-bold">Ano</label>
            <select className="form-control" ref={refAno}>
              {anos.map(ano => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="font-weight-bold">Mês</label>
            <select className="form-control" ref={refMes}>
              {meses.map(zeroPad).map(mes => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-warning rounded-pill btn-block"
              onClick={verMes}
              title="Salvar novo mês"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdicionarMes;
