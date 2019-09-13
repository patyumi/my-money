import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { IoMdLogOut } from "react-icons/io";
import { GiConvergenceTarget } from "react-icons/gi";

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
    <div className="container-fluid bg-light">
      <nav className="navbar mx-md-5">
        <Link
          tag="a"
          className="navbar-brand font-weight-bold text-dark"
          to="/"
          title="Home"
        >
          <GiConvergenceTarget className="mr-2" />
          MY MONEY
        </Link>

        {!logado && (
          <Link tag="a" to="" onClick={logout} className="nav-link text-dark">
            <IoMdLogOut className="mr-2" />
            Logout
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
