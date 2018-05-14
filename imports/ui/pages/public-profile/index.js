import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LandingPageHeader from '../../components/landing-page-header';
import Spinner from '../../components/spinner';

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
        User Name: {user.username}
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
