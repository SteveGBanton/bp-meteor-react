/* eslint-disable jsx-a11y/no-href*/

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Bert } from 'meteor/themeteorchef:bert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// Dashboard layouts
import AllUserAccess from '../layouts/AllUserAccess/AllUserAccess';
import ClientAdmin from '../layouts/ClientAdmin/ClientAdmin';
import Public from '../layouts/Public/Public';
import SuperAdmin from '../layouts/SuperAdmin/SuperAdmin';
import UserAdmin from '../layouts/UserAdmin/UserAdmin';

// SuperAdmin pages

// ClientAdmin pages
import ClientDashboard from '../layouts/ClientAdmin/ClientDashboard/ClientDashboard';
import ClientDocuments from '../layouts/ClientAdmin/ClientDocuments/ClientDocuments';
import ClientNewDocument from '../layouts/ClientAdmin/ClientDocuments/ClientNewDocument/ClientNewDocument';
import ClientViewDocument from '../layouts/ClientAdmin/ClientDocuments/ClientViewDocument/ClientViewDocument';
import ClientEditDocument from '../layouts/ClientAdmin/ClientDocuments/ClientEditDocument/ClientEditDocument';
import ClientProfile from '../layouts/ClientAdmin/ClientProfile/ClientProfile';
import Table from '../layouts/ClientAdmin/Table/Table';

// UserAdmin pages
import UserDashboard from '../layouts/UserAdmin/UserDashboard/UserDashboard';

// Public Only pages
import Signup from '../layouts/Public/Signup/Signup';
import Login from '../layouts/Public/Login/Login';
import Logout from '../layouts/Public/Logout/Logout';

// All users pages
import Index from '../layouts/AllUserAccess/Index/Index';
import NotFound from '../layouts/AllUserAccess/NotFound/NotFound';
import Terms from '../layouts/AllUserAccess/Terms/Terms';
import Privacy from '../layouts/AllUserAccess/Privacy/Privacy';
import RecoverPassword from '../layouts/AllUserAccess/RecoverPassword/RecoverPassword';
import ResetPassword from '../layouts/AllUserAccess/ResetPassword/ResetPassword';
import VerifyEmail from '../layouts/AllUserAccess/VerifyEmail/VerifyEmail';

// Components
import Navigation from '../components/Navigation/Navigation';

import './App.scss';

const App = props => (
  <Router>
    {
      (!props.loading)
      ?
        <MuiThemeProvider>
          <div className="App">
            <Navigation {...props} />
            <Switch>
              <AllUserAccess exact path="/" component={Index} {...props} />
              <ClientAdmin exact path="/:username/admin/dashboard" component={ClientDashboard} {...props} />
              <ClientAdmin exact path="/:username/admin/table" component={Table} {...props} />
              {/* <ClientAdmin exact path="/:username/admin/calendar" component={ClientDashboard} {...props} /> */}
              <ClientAdmin exact path="/:username/admin/documents" component={ClientDocuments} {...props} />
              <ClientAdmin exact path="/:username/admin/documents/new" component={ClientNewDocument} {...props} />
              <ClientAdmin exact path="/:username/admin/documents/:_id" component={ClientViewDocument} {...props} />
              <ClientAdmin exact path="/:username/admin/documents/:_id/edit" component={ClientEditDocument} {...props} />
              <ClientAdmin exact path="/:username/admin/profile" component={ClientProfile} {...props} />
              <UserAdmin exact path="/:username/user/dashboard" component={UserDashboard} {...props} />
              <Public exact path="/signup" component={Signup} {...props} />
              <Public exact path="/login" component={Login} {...props} />
              <Public exact path="/logout" component={Logout} {...props} />
              <AllUserAccess name="verify-email" path="/verify-email/:token" component={VerifyEmail} />
              <AllUserAccess name="recover-password" path="/recover-password" component={RecoverPassword} />
              <AllUserAccess name="reset-password" path="/reset-password/:token" component={ResetPassword} />
              <AllUserAccess name="terms" path="/terms" component={Terms} />
              <AllUserAccess name="privacy" path="/privacy" component={Privacy} />
              <AllUserAccess component={NotFound} />
            </Switch>
          </div>
        </MuiThemeProvider>
      : ''
    }
  </Router>
);

App.defaultProps = {
  userId: '',
  emailAddress: '',
};

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  userId: PropTypes.string,
  emailAddress: PropTypes.string,
  emailVerified: PropTypes.bool.isRequired,
};

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default createContainer(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const loading = !Roles.subscription.ready();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loading,
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    user,
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
}, App);
