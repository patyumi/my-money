import React from 'react';
import { Link } from 'react-router-dom';

import { FaCoins } from 'react-icons/fa';

const Header = () => {
  return(
    <nav className="navbar navbar-dark bg-dark">
      <Link to="/" className="navbar-brand logo" style={{ fontWeight: 'bold' }}>My M<FaCoins />ney</Link>
    </nav>
  );
}

export default Header;
