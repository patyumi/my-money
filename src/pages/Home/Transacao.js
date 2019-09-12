import React from "react";
import { Link } from "react-router-dom";

import { TiEyeOutline } from "react-icons/ti";

const Transacao = ({ mes, data }) => {
  return (
    <div key={mes} className="bg-light my-2 px-3 rounded h-auto">
      <div className="container-fluid h-100">
        <div className="row align-items-center text-center h-100">
          <div className="col-1">
            <Link
              to={`/movimentacoes/${mes}`}
              tag="button"
              className="btn btn-warning text-white rounded-circle"
              title="Editar movimentação"
            >
              <TiEyeOutline style={{ fontSize: "24px" }} />
            </Link>
          </div>
          <div className="col-3">
            <h1 className="text-secondary">{mes}</h1>
          </div>

          <div className="col-2 text-secondary text-secondary">
            <small className="m-0">PREVISÃO ENTRADA</small>
            <h1 className="my-2" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "12px" }}>R$</span>
              {data.previsao_entrada}
            </h1>
          </div>
          <div className="col-2 text-secondary">
            <small>ENTRADA</small>
            <h1 className="my-2 text-success" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "12px" }}>R$</span>
              {data.entradas}
            </h1>
          </div>

          <div className="col-2 text-secondary">
            <small>PREVISÃO SAÍDA</small>
            <h1 className="my-2" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "14px" }}>R$</span>
              {data.previsao_saida}
            </h1>
          </div>
          <div className="col-2 text-secondary">
            <small>SAÍDA</small>
            <h1 className="my-2 text-danger" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "14px" }}>R$</span>
              {data.saidas}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transacao;
