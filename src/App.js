import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Elements
import Header from "./elements/Header";

import Home from "./pages/Home";
//import Login from "./pages/Login";
import Movimentacoes from "./pages/Movimentacoes";
import Nomatch from "./nomatch";

function App() {
  // Elementos
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        {/*<Route exact path="/login" component={Login} />*/}
        <Route exact path="/movimentacoes/:data" component={Movimentacoes} />
        <Route component={Nomatch} />
      </Switch>
    </Router>
  );
}

export default App;
