import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { oneOfType, element, arrayOf, func } from 'prop-types';
import MainLayout from '../../ui/layouts/main-layout';
import LandingPageLayout from '../../ui/layouts/landing-page-layout';
import AdminPanelLayout from '../../ui/layouts/admin-panel-layout';
import PostLayout from '../../ui/layouts/post-layout';
import Home from '../../ui/containers/home-container';
import PostContainer from '../../ui/containers/post-container';
import AdminContainer from '../../ui/containers/admin-container';
import SignIn from '../../ui/containers/signin-container';
import SignUp from '../../ui/containers/signup-container';
import ForgotPass from '../../ui/containers/forgot-pass-container';
import ResetPass from '../../ui/containers/reset-pass-container';
import PublicProfileContainer from '../../ui/containers/public-profile-container';
import NotFound from '../../ui/pages/not-found';

const LandingPageRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <LandingPageLayout>
        <Component {...matchProps} />
      </LandingPageLayout>
    )}
  />
);

LandingPageRoute.propTypes = {
  component: oneOfType([arrayOf(element), element, func]).isRequired,
};

const AdminPanelRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <AdminPanelLayout>
        <Component {...matchProps} />
      </AdminPanelLayout>
    )}
  />
);

AdminPanelRoute.propTypes = {
  component: oneOfType([arrayOf(element), element, func]).isRequired,
};

const PostRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <PostLayout>
        <Component {...matchProps} />
      </PostLayout>
    )}
  />
);

PostRoute.propTypes = {
  component: oneOfType([arrayOf(element), element, func]).isRequired,
};

export default (
  <MainLayout>
    <Switch>
      <LandingPageRoute exact path="/" component={Home} />
      <LandingPageRoute exact path="/signin" component={SignIn} />
      <LandingPageRoute exact path="/signup" component={SignUp} />
      <LandingPageRoute exact path="/forgot-password" component={ForgotPass} />
      <LandingPageRoute exact path="/reset-password/:token" component={ResetPass} />
      <LandingPageRoute exact path="/profile/:userId?" component={PublicProfileContainer} />
      <AdminPanelRoute path="/admin" component={AdminContainer} />
      <PostRoute exact path="/post/:slug" component={PostContainer} />
      <Route component={NotFound} />
    </Switch>
  </MainLayout>
);
