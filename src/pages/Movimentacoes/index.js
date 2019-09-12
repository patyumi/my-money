import React from "react";

import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { useMovimentacaoApi } from "../../api";

import InfoMes from "./InfoMes";
import AdicionarMovimentacao from "./AdicionarMovimentacao";

import {
  MdDateRange,
  MdKeyboardArrowRight,
  MdAccountBalanceWallet,
  MdRemove
} from "react-icons/md";

const Movimentacoes = ({ match }) => {
  const {
    movimentacoes,
    salvarNovaMovimentacao,
    removerMovimentacao
  } = useMovimentacaoApi(match.params.data);

  const salvarMovimentacao = async dados => {
    await salvarNovaMovimentacao(dados);
    movimentacoes.refetch();
    await sleep(5000);
    //infoMes.refetch();
  };

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));
  const removerMovimentacaoClick = async id => {
    await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`);
    movimentacoes.refetch();

    await sleep(5000);
    //infoMes.refetch();
  };

  if (movimentacoes.error === "Permission denied") {
    return <Redirect to="/login" />;
  }

  return (
    <div className="col-8 col-md-10 w-auto h-100">
      <div className="d-flex h-25 w-auto justify-content-between flex-column px-1 px-md-5 py-2 border-bottom border-secondary">
        <h1 className="h-auto text-secondary">{match.params.data}</h1>

        <InfoMes data={match.params.data} />
      </div>

      <div
        className="d-flex align-items-center justify-content-center p-1 p-md-5 flex-fill w-auto my-3 text-dark-50 rounded shadow-sm"
        style={{ backgroundColor: "#FFF" }}
      >
        <table className="table table-responsive-md table-hover text-center">
          <thead>
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Valor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.data &&
              Object.keys(movimentacoes.data).map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{movimentacoes.data[movimentacao].descricao}</td>
                    <td>{movimentacoes.data[movimentacao].valor} </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => removerMovimentacaoClick(movimentacao)}
                        title="Remover Transação"
                      >
                        <MdRemove />
                      </button>
                    </td>
                  </tr>
                );
              })}
            <AdicionarMovimentacao
              salvarNovaMovimentacao={salvarMovimentacao}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Movimentacoes;
