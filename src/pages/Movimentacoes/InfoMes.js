import React from "react";
import { useMesApi } from "../../api";

import printMoney from "../../assets/img/printMoney.svg";

const InfoMes = ({ data }) => {
  const { infoMes, alterarMes } = useMesApi(data);

  const alterarPrevisaoEntrada = evt => {
    alterarMes({ previsao_entrada: evt.target.value });
  };

  const alterarPrevisaoSaida = evt => {
    alterarMes({ previsao_saida: evt.target.value });
  };

  if (infoMes.loading) {
    return (
      <div className="container-fluid my-2">
        <div className="row justify-content-md-center">
          <div className="col-12 rounded text-center p-2">
            <h5 className="text-secondary">Carregando dados do mês ...</h5>
          </div>
        </div>
      </div>
    );
  }
  if (infoMes.data) {
    return (
      <div className="container-fluid my-2">
        <div className="row justify-content-md-center">
          <button
            type="button"
            className="col-12 col-md-2 rounded text-center p-2 text-white btn btn-success"
          >
            <h1 className="my-2" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "14px" }}>R$</span>
              {infoMes.data.previsao_entrada}
            </h1>
            <small>PREVISÃO ENTRADAS</small>

            <input type="text" onBlur={alterarPrevisaoEntrada} />
          </button>

          <button
            type="button"
            className="col-12 col-md-2 rounded text-center p-2 text-white mx-md-3 btn btn-danger"
          >
            <h1 className="my-2" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "14px" }}>R$</span>
              {infoMes.data.previsao_saida}
            </h1>
            <small>PREVISÃO SAÍDAS</small>

            <input type="text" onBlur={alterarPrevisaoSaida} />
          </button>

          <div className="col-12 col-md rounded text-center p-2 text-white mx-2">
            <img src={printMoney} className="img-fluid" alt="printing money" />
          </div>

          <button
            type="button"
            className="col-12 col-md-2 rounded text-center p-2 mx-md-3 btn btn-light btn-lg"
            disabled
          >
            <h1 className="text-success my-2" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "14px" }}>R$</span>
              {infoMes.data.entradas}
            </h1>
            <small className="text-secondary">ENTRADAS</small>
          </button>

          <button
            type="button"
            className="col-12 col-md-2 rounded text-center p-2 btn btn-light btn-lg"
            disabled
          >
            <h1 className="text-danger my-2" style={{ fontSize: "44px" }}>
              <span style={{ fontSize: "14px" }}>R$</span>
              {infoMes.data.saidas}
            </h1>
            <small className="text-secondary">SAÍDAS</small>
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default InfoMes;
