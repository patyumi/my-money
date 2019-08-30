import React, { useState } from "react";

import { Redirect } from "react-router-dom";

import Rest from "../utils/rest";

import { Link } from "react-router-dom";

import "../assets/css/editInPlace.css";
import {
  MdDateRange,
  MdKeyboardArrowRight,
  MdAccountBalanceWallet,
  MdAdd,
  MdRemove
} from "react-icons/md";

const baseURL = "https://mymoney-curso-devpleno.firebaseio.com/";
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL);

const Movimentacoes = ({ match }) => {
  const data = useGet(`movimentacoes/${match.params.data}`);
  const dataMeses = useGet(`meses/${match.params.data}`);

  const [dataPatch, patch] = usePatch();

  const [postData, salvar] = usePost(`movimentacoes/${match.params.data}`);
  const [removeData, remover] = useDelete();
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const onChangeDescricao = evt => {
    setDescricao(evt.target.value);
  };

  const onChangeValor = evt => {
    setValor(evt.target.value);
  };

  const salvarMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        descricao,
        valor: parseFloat(valor)
      });
      setDescricao("");
      setValor("");
      data.refetch();

      await sleep(5000);
      dataMeses.refetch();
    }
  };

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));
  const removerMovimentacao = async id => {
    await remover(`movimentacoes/${match.params.data}/${id}`);
    data.refetch();
  };

  const alterarPrevisaoEntrada = evt => {
    patch(`meses/${match.params.data}`, { previsao_entrada: evt.target.value });
  };

  const alterarPrevisaoSaida = evt => {
    patch(`meses/${match.params.data}`, { previsao_saida: evt.target.value });
  };

  if (data.error === "Permission denied") {
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

      <div class="d-flex flex-lg-row flex-md-column flex-sm-column">
        {!dataMeses.loading && dataMeses.data && (
          <div
            className="d-flex flex-column align-items-center justify-content-center px-5 my-3 mr-3 flex-fill text-dark-50 rounded shadow-sm"
            style={{ backgroundColor: "#FFF" }}
          >
            <h1>Carteira</h1>
            <h6>
              Previsao de entrada: {dataMeses.data.previsao_entrada}
              <input type="text" onBlur={alterarPrevisaoEntrada}></input>
            </h6>
            <h6>
              Previsao de saída: {dataMeses.data.previsao_saida}
              <input type="text" onBlur={alterarPrevisaoSaida}></input>
            </h6>
            <hr />
            <h6>Entradas: {dataMeses.data.entradas}</h6>
            <h6>Saídas: {dataMeses.data.saidas}</h6>
          </div>
        )}

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
              {data.data &&
                Object.keys(data.data).map(movimentacao => {
                  return (
                    <tr key={movimentacao}>
                      <td>{data.data[movimentacao].descricao}</td>
                      <td>{data.data[movimentacao].valor} </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => removerMovimentacao(movimentacao)}
                          title="Remover Transação"
                        >
                          <MdRemove />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td>
                  <input
                    type="text"
                    value={descricao}
                    onChange={onChangeDescricao}
                    placeholder="Transação aqui"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={valor}
                    onChange={onChangeValor}
                    placeholder="Valor em R$"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    type="button"
                    onClick={salvarMovimentacao}
                    title="Salvar Transação"
                  >
                    <MdAdd />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Movimentacoes;
