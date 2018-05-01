import React from 'react';
import { Link } from 'react-router-dom';
import { bool, object, func, node } from 'prop-types';
import imageUrlHelper from '../../utils/image-url-helper';
import { defaultNavBarBgColor } from '../../settings';

const LandingPageHeader = ({
  isLogging,
  user,
  requestLogout,
  entity,
  isEntityLoading,
  searchComponent,
}) => {
  const loggedIn = () => !isLogging && user && user._id;
  if (isEntityLoading) return null;
  return (
    <header
      className="header"
      style={{ backgroundColor: entity.websiteNavBarBgColor || defaultNavBarBgColor }}
    >
      <nav className={`container header-nav ${entity && (entity.websiteLogo || entity.websiteName) ? 'with-logo-title' : ''}`}>
        <div className="header-logo-container">
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
          {entity && entity.websiteName
            && <span className="header-website-name">{entity.websiteName}</span>}
        </div>
        <div>
          {searchComponent}
          <span>
            {loggedIn() ? <a href="#" onClick={requestLogout}>Sign Out</a> : null}
          </span>
        </div>
      </nav>
    </header>
  );
};

LandingPageHeader.propTypes = {
  isLogging: bool,
  user: object,
  requestLogout: func.isRequired,
  entity: object,
  isEntityLoading: bool.isRequired,
  searchComponent: node,
};

LandingPageHeader.defaultProps = {
  entity: {},
  user: {},
  searchComponent: null,
  isLogging: false,
};

export default LandingPageHeader;
