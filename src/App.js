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
    <div className="container-fluid bg-dange">
      <Router>
        <div className="row bg-light min-vh-100">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            {/*<Route exact path="/login" component={Login} />*/}
            <Route
              exact
              path="/movimentacoes/:data"
              component={Movimentacoes}
            />
            <Route component={Nomatch} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
