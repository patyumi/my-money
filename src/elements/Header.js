import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import moneyimg from "../assets/img/moneyimg.svg";

const Header = () => {
  const [logado, setLogado] = useState(false);
  const [forceRedirect, setForceRedirect] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, []);

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    setLogado(false);
    setForceRedirect(true);
    window.location.reload();
  };

  if (forceRedirect) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <div className="col-md-2 bg-white shadow-sm">
        <nav className="d-flex flex-column h-100 justify-content-start">
          <Link
            className="text-decoration-none d-inline-flex w-100 flex-column align-items-center border-bottom justify-content-center py-3 h-50"
            to="/"
            style={{ fontWeight: "bold" }}
            title="Home"
          >
            <img className="img-fluid mb-3 " src={moneyimg} alt="money" />
            <h2 className="text-center text-dark">My Money</h2>
          </Link>
          <Link
            to="/"
            style={{ fontWeight: "bold" }}
            className="text-decoration-none d-inline-flex w-100 justify-content-center py-3 h-auto border-bottom text-secondary"
          >
            Movimentações
          </Link>
          {logado && (
            <Link
              to=""
              onClick={logout}
              style={{ fontWeight: "bold" }}
              className="text-decoration-none d-inline-flex w-100 justify-content-center py-3 h-auto border-bottom text-secondary"
            >
              Sair
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
