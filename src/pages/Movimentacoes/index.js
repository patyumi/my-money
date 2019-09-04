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
    <div className="container">
      <div
        className="d-flex align-items-center justify-content-start p-2 flex-fill w-100 my-3 text-dark-50 rounded shadow-sm"
        style={{ backgroundColor: "#FFF" }}
      >
        <h4 className="font-weight-lighter">
          <Link to="/" className="text-dark" title="Voltar">
            <MdDateRange className="mr-2 font-weight-lighter" />
            Visão Geral
          </Link>
        </h4>
        <h3 className="px-2 font-weight-lighter">
          <MdKeyboardArrowRight />
        </h3>
        <h3 className="font-weight-normal">
          <MdAccountBalanceWallet className="mr-2" />
          Movimentacoes
        </h3>
      </div>

      <InfoMes data={match.params.data} />

      <div class="d-flex flex-lg-row flex-md-column flex-sm-column">
        <div
          className="d-flex flex-column align-items-center justify-content-center flex-fill px-5 my-3 text-dark-50 rounded shadow-sm"
          style={{ backgroundColor: "#FFF" }}
        >
          <h1>Transações</h1>
          <table className="table table-hover text-center">
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
    </div>
  );
};

export default Movimentacoes;
