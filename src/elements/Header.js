import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FaCoins } from "react-icons/fa";

const Header = () => {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogado(true);
    } else {
      setLogado(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setLogado(false);
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand logo" style={{ fontWeight: "bold" }}>
        My M<FaCoins />
        ney
      </Link>
      {logado && (
        <button onClick={logout} className="btn navbar-text">
          Sair
        </button>
      )}
    </nav>
  );
};

export default Header;
