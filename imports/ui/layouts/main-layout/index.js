import { element, oneOfType, arrayOf, object } from 'prop-types';

const LandingPageLayout = ({ children }) => children;

LandingPageLayout.propTypes = {
  children: oneOfType([arrayOf(element), object]).isRequired,
};

export default LandingPageLayout;
