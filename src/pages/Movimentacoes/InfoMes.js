import React from "react";
import { useMesApi } from "../../api";

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
      <div
        className="d-flex flex-column align-items-center justify-content-center px-5 my-3 mr-3 flex-fill text-dark-50 rounded shadow-sm"
        style={{ backgroundColor: "#FFF" }}
      >
        <h4>Carregando dados do mês ...</h4>
      </div>
    );
  }
  if (infoMes.data) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center px-5 my-3 mr-3 flex-fill text-dark-50 rounded shadow-sm"
        style={{ backgroundColor: "#FFF" }}
      >
        <h1>Carteira</h1>
        <h6>
          Previsao de entrada: {infoMes.data.previsao_entrada}
          <input type="text" onBlur={alterarPrevisaoEntrada}></input>
        </h6>
        <h6>
          Previsao de saída: {infoMes.data.previsao_saida}
          <input type="text" onBlur={alterarPrevisaoSaida}></input>
        </h6>
        <hr />
        <h6>Entradas: {infoMes.data.entradas}</h6>
        <h6>Saídas: {infoMes.data.saidas}</h6>
      </div>
    );
  }
  return null;
};

export default InfoMes;
