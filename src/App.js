import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Elements
import Header from "./elements/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Movimentacoes from "./pages/Movimentacoes";

function App() {
  // Elementos
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/movimentacoes/:data" component={Movimentacoes} />
      </div>
    </Router>
  );
}

export default App;
