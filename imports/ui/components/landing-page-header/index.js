import React from 'react';
import { Link } from 'react-router-dom';
import { bool, object, func } from 'prop-types';
import imageUrlHelper from '../../utils/image-url-helper';

const LandingPageHeader = ({
  isLogging,
  user,
  requestLogout,
  entity,
  isEntityLoading,
}) => {
  const loggedIn = () => !isLogging && user && user._id;
  if (isEntityLoading) return null;
  return (
    <header className="header">
      <nav className={`container header-nav ${entity && entity.websiteLogo ? 'with-logo' : ''}`}>
        {entity && entity.websiteLogo ? (
          <Link to="/">
            <img
              src={imageUrlHelper(
                entity.websiteLogo.version,
                entity.websiteLogo.publicId,
                entity.websiteLogo.format,
                'w_200,c_limit',
              )}
              alt="logo"
              className="header-logo"
            />
          </Link>
        ) : null}
        <span>
          <Link to="/"><span>Home</span></Link>
          {loggedIn() ? <a href="#" onClick={requestLogout}>Sign Out</a> : null}
        </span>
      </nav>
    </header>
  );
};

LandingPageHeader.propTypes = {
  isLogging: bool.isRequired,
  user: object.isRequired,
  requestLogout: func.isRequired,
  entity: object,
  isEntityLoading: bool.isRequired,
};

LandingPageHeader.defaultProps = {
  entity: {},
};

export default LandingPageHeader;
