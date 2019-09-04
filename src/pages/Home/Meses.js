import React from "react";
import { Link, Redirect } from "react-router-dom";
import Rest from "../../utils/rest";

const baseURL = "https://mymoney-curso-devpleno.firebaseio.com/";
const { useGet } = Rest(baseURL);

const Meses = () => {
  const data = useGet("meses");

  if (data.loading) {
    return <span>Loading...</span>;
  }

  if (data.error && data.error === "Permission denied") {
    return <Redirect to="/login" />;
  }

  if (Object.keys(data.data).length > 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center p-5 flex-fill w-100 my-3 text-dark-50 rounded shadow-sm"
        style={{ backgroundColor: "#FFF" }}
      >
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Mês</th>
              <th scope="col">Previsão Entrada</th>
              <th scope="col">Entrada</th>
              <th scope="col">Previsão Saída</th>
              <th scope="col">Saída</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.data).map(mes => {
              return (
                <tr key={mes}>
                  <td>
                    <Link to={`/movimentacoes/${mes}`}>{mes}</Link>
                  </td>
                  <td>{data.data[mes].previsao_entrada}</td>
                  <td className="font-weight-bold text-success">
                    {data.data[mes].entradas}
                  </td>
                  <td>{data.data[mes].previsao_saida}</td>
                  <td className="font-weight-bold text-danger">
                    {data.data[mes].saidas}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return null;
};

export default Meses;
