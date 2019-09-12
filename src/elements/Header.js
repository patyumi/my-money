import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { IoMdLogOut } from "react-icons/io";

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
    <div className="container-fluid bg-secondary">
      <nav className="navbar mx-md-5">
        <Link
          tag="a"
          className="navbar-brand text-white font-weight-bold"
          to="/"
          title="Home"
        >
          My Money
        </Link>

        {!logado && (
          <Link to="" onClick={logout} className="nav-link text-white">
            <IoMdLogOut className="mr-2" />
            Sair
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
