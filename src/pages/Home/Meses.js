import React from "react";
import { Redirect } from "react-router-dom";
import Rest from "../../utils/rest";

import Transacao from "./Transacao";

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

  return (
    <div className="col col-md-10">
      <div className="bg-warning rounded p-2 pl-4">
        <h5 className="font-weight-bold">Movimentações</h5>
      </div>

      {Object.keys(data.data).length > 0 ? (
        Object.keys(data.data).map(mes => {
          return <Transacao key={mes} mes={mes} data={data.data[mes]} />;
        })
      ) : (
        <h1>Não existem movimentações cadastradas.</h1>
      )}
    </div>
  );
};

export default Meses;
