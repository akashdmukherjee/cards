import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LandingPageHeader from '../../components/landing-page-header';
import Spinner from '../../components/spinner';
import imageUrlHelper from '../../utils/image-url-helper';

const PublicProfile = ({
  user,
  entity,
  isLogging,
  requestLogout,
  isEntityLoading,
}) => {
  if (!user._id) return <Spinner />;
  return (
    <Fragment>
      <LandingPageHeader
        isLogging={isLogging}
        user={user}
        requestLogout={requestLogout}
        isEntityLoading={isEntityLoading}
        entity={entity}
      />
      <div className="public-profile">
        {user.avatar && (
          <div>
            <img
              src={imageUrlHelper(
                user.avatar.version,
                user.avatar.publicId,
                user.avatar.format,
                'w_100,h_100,g_face,c_thumb,r_max',
              )}
              alt="user avatar"
            />
          </div>
        )}
        <strong>User Name:</strong> {user.username} <br />
        <strong>User Bio:</strong> {user.bio}
      </div>
    </Fragment>
  );
};

PublicProfile.propTypes = {
  user: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  isLogging: PropTypes.bool.isRequired,
  requestLogout: PropTypes.func.isRequired,
  isEntityLoading: PropTypes.bool.isRequired,
};

export default PublicProfile;
