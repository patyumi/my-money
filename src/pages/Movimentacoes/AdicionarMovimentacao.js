import React, { useState } from "react";

const AdicionarMovimentacao = ({ salvarNovaMovimentacao }) => {
  // Gestão do form
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
      await salvarNovaMovimentacao({
        descricao,
        valor: parseFloat(valor)
      });
      setDescricao("");
      setValor("");
    }
  };

  return (
    <form>
      <div className="form-group">
        <label className="font-weight-bold">Transação</label>
        <input
          type="text"
          class="form-control"
          value={descricao}
          onChange={onChangeDescricao}
          placeholder="Ex.: 13º Salário"
        />
      </div>

      <div className="form-group">
        <label className="font-weight-bold">Valor (R$)</label>
        <input
          type="text"
          class="form-control"
          value={valor}
          onChange={onChangeValor}
          placeholder="Insira o valor SEM os centavos (Ex.: 520)"
        />
      </div>

      <div className="form-group">
        <button
          type="button"
          className="btn btn-warning rounded-pill btn-block"
          onClick={salvarMovimentacao}
          title="Salvar novo mês"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

export default AdicionarMovimentacao;
