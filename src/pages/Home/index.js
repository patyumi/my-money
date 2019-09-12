import React from "react";

import Meses from "./Meses";
import AdicionarMes from "./AdicionarMes";

const Home = () => {
  return (
    <div className="container-fluid pt-5">
      <div className="row mx-2 mx-md-5">
        <AdicionarMes />
        <Meses />
      </div>
    </div>
  );
};

export default Home;
