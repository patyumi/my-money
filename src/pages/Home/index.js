import React from "react";

import Meses from "./Meses";
import AdicionarMes from "./AdicionarMes";

const Home = () => {
  return (
    <div className="col-md-10">
      <div className="d-flex h-25 w-100 justify-content-between flex-column px-5 py-2 border-bottom border-secondary">
        <h1 className="h-25 text-secondary">Movimentações</h1>
        <AdicionarMes />
      </div>
      <Meses />
    </div>
  );
};

export default Home;
