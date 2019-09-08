import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";

import { MdDateRange } from "react-icons/md";
import month from "../../assets/img/month.svg";

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
    console.log("ok");
    setRedir(refAno.current.value + "-" + refMes.current.value);
  };

  if (redir !== "") {
    return <Redirect to={"/movimentacoes/" + redir} />;
  }

  return (
    <>
      <div
        className="d-inline-flex flex-column align-items-center justify-content-center w-25 h-50 border boder-secondary bg-white rounded"
        style={{ maxWidth: "18rem" }}
      >
        <div className="d-inline-flex flex-row w-100 h-50">
          <img
            className="img-fluid rounded w-25 h-100 mr-3"
            src={month}
            alt="new month"
          />
          <h5 className="d-inline-flex w-75 h-100 text-secondary h-100">
            Adicionar Mês
          </h5>
        </div>

        <form className="form-inline d-inline-flex flex-row align-items-center w-100 h-75">
          <select
            className="custom-select my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            ref={refAno}
          >
            {anos.map(ano => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
          <select
            className="custom-select my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            ref={refMes}
          >
            {meses.map(zeroPad).map(mes => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-dark my-1"
            onClick={verMes}
            title="Salvar novo mês"
          >
            Salvar
          </button>
        </form>
      </div>
    </>
  );
};

export default AdicionarMes;
