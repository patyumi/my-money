import React, { useState } from "react";

import { MdAdd } from "react-icons/md";

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
    <tr>
      <td>
        <input
          type="text"
          value={descricao}
          onChange={onChangeDescricao}
          placeholder="Transação"
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
  );
};

export default AdicionarMovimentacao;
