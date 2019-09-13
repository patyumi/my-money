import React from "react";

import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaTimesCircle
} from "react-icons/fa";

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
    <div className="container-fluid pt-5 ">
      <div className="row mx-2 mx-md-5">
        <div className="col-12 bg-warning rounded p-2 pl-4">
          <h5 className="font-weight-bold">{match.params.data}</h5>
        </div>

        <InfoMes data={match.params.data} />
      </div>

      <div className="row mx-2 mx-md-5 mt-4">
        <div className="col-12 col-md-4 p-0 mr-3">
          <div className="bg-warning p-2 pl-4 rounded">
            <h5 className="font-weight-bold">Adicionar movimentação</h5>
          </div>

          <div className="bg-light rounded mt-2 p-4">
            <AdicionarMovimentacao
              salvarNovaMovimentacao={salvarMovimentacao}
            />
          </div>
        </div>

        <div className="col p-0">
          <div className="bg-warning p-2 pl-4 rounded">
            <h5 className="font-weight-bold">Histórico</h5>
          </div>
          {movimentacoes.data &&
            Object.keys(movimentacoes.data).map(movimentacao => {
              return (
                <div
                  key={movimentacao}
                  className="container-fluid rounded mt-2"
                >
                  <div className="row bg-light rounded p-3 justify-content-md-center">
                    <div className="col-2 text-center">
                      {movimentacoes.data[movimentacao].valor > 0 ? (
                        <FaArrowAltCircleUp className="text-success" />
                      ) : (
                        <FaArrowAltCircleDown className="text-danger" />
                      )}
                    </div>
                    <div className="col-5 text-capitalize">
                      {movimentacoes.data[movimentacao].descricao}
                    </div>
                    {movimentacoes.data[movimentacao].valor > 0 ? (
                      <div className="col-3 text-right font-weight-bold text-success">
                        R$ {movimentacoes.data[movimentacao].valor}
                      </div>
                    ) : (
                      <div className="col-3 text-right font-weight-bold text-danger">
                        R$ {movimentacoes.data[movimentacao].valor}
                      </div>
                    )}

                    <div className="col-2 text-center">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => removerMovimentacaoClick(movimentacao)}
                        title="Remover Transação"
                      >
                        <FaTimesCircle className="text-secondary" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Movimentacoes;
