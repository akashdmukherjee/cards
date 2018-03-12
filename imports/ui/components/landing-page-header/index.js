import React from 'react';
import { Link } from 'react-router-dom';
import { bool, object, func } from 'prop-types';

const LandingPageHeader = ({ isLogging, user, requestLogout }) => {
  const loggedIn = () => !isLogging && user && user._id;
  return (
    <header className="header">
      <nav className="container header-nav">
        <Link to="/">Home</Link>
        {loggedIn() ? <a href="#" onClick={requestLogout}>Sign Out</a> : null}
      </nav>
    </header>
  );
};

LandingPageHeader.propTypes = {
  isLogging: bool.isRequired,
  user: object.isRequired,
  requestLogout: func.isRequired,
};

export default LandingPageHeader;
