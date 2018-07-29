import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import imageUrlHelper from '../../utils/image-url-helper';
import { defaultNavBarBgColor, defaultFontFamily } from '../../settings';
import Notifications from '../notifications';

const LandingPageHeader = ({
  isLogging,
  user,
  requestLogout,
  entity,
  isEntityLoading,
  searchComponent,
  notifications,
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
            && <Link to="/"><span style={{ fontFamily: entity.websiteFontFamily || defaultFontFamily }} className="header-website-name">{entity.websiteName}</span></Link>}
          {searchComponent}
        </div>
        <div>
          <span>
            {!loggedIn()
              ? <Link to="/signin">Sign In</Link>
              : <Fragment>
                  <Link to="/profile">Profile</Link>
                  <Link to="/admin">
                    {user.adminUser ? 'Admin Panel' : 'Settings'}
                  </Link>
                  <a href="#" onClick={requestLogout}>Sign Out</a>
                  <Dropdown
                    overlay={<Notifications notifications={notifications} />}
                    trigger={['click']}
                  >
                    <a className="ant-dropdown-link" href="#">
                      <Icon type="bell" />
                    </a>
                  </Dropdown>
                </Fragment>}
          </span>
        </div>
      </nav>
    </header>
  );
};

LandingPageHeader.propTypes = {
  isLogging: PropTypes.bool,
  user: PropTypes.object,
  requestLogout: PropTypes.func.isRequired,
  entity: PropTypes.object,
  isEntityLoading: PropTypes.bool.isRequired,
  searchComponent: PropTypes.node,
  notifications: PropTypes.array,
};

LandingPageHeader.defaultProps = {
  entity: {},
  user: {},
  searchComponent: null,
  isLogging: false,
  notifications: [],
};

export default LandingPageHeader;
