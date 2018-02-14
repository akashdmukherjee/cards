import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const Spinner = ({ nomargins }) => {
  const klass = cx({
    'spinner-wrapper': true,
    nomargins,
  });
  return (
    <div>
      <div className="landing-subpage-lead small" />
      <div className="landing-subpage-content small">
        <div className="container">
          <div className={klass}>
            <div className="spinner">
              <div className="double-bounce1" />
              <div className="double-bounce2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Spinner.propTypes = {
  nomargins: PropTypes.bool,
};

Spinner.defaultProps = {
  nomargins: false,
};

export default Spinner;
