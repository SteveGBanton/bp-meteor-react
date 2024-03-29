/* eslint-disable jsx-a11y/no-href*/

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { Bert } from 'meteor/themeteorchef:bert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import StudentsCollection from '../../api/Students/Students';
import UploadsCollection from '../../api/Uploads/Uploads';

// Dashboard layoutsd
import AllUserAccess from '../layouts/AllUserAccess/AllUserAccess';
import ClientAdmin from '../layouts/ClientAdmin/ClientAdmin';
import Public from '../layouts/Public/Public';
import SuperAdmin from '../layouts/SuperAdmin/SuperAdmin';
import UserAdmin from '../layouts/UserAdmin/UserAdmin';

// Download page
import Download from '../layouts/Download/Download';

// SuperAdmin pages

// ClientAdmin pages
import ClientDashboard from '../layouts/ClientAdmin/ClientDashboard/ClientDashboard';
import ClientDocuments from '../layouts/ClientAdmin/ClientDocuments/ClientDocuments';
import ClientNewDocument from '../layouts/ClientAdmin/ClientDocuments/ClientNewDocument/ClientNewDocument';
import ClientViewDocument from '../layouts/ClientAdmin/ClientDocuments/ClientViewDocument/ClientViewDocument';
import ClientEditDocument from '../layouts/ClientAdmin/ClientDocuments/ClientEditDocument/ClientEditDocument';
import ClientProfile from '../layouts/ClientAdmin/ClientProfile/ClientProfile';
import Students from '../layouts/ClientAdmin/Students/Students';
import EditStudent from '../layouts/ClientAdmin/Students/EditStudent/EditStudent';
import ViewStudent from '../layouts/ClientAdmin/Students/ViewStudent/ViewStudent';
import AddStudent from '../layouts/ClientAdmin/Students/AddStudent/AddStudent';
import AddSchema from '../layouts/ClientAdmin/SchemaForms/AddSchema';
import EditSchema from '../layouts/ClientAdmin/SchemaForms/EditSchema';
import ViewSchema from '../layouts/ClientAdmin/SchemaForms/ViewSchema';

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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleNavBar = this.toggleNavBar.bind(this);
    this.onNavBar = this.onNavBar.bind(this);
    this.offNavBar = this.offNavBar.bind(this);
    this.state = {
      menuOpen: true,
      navBarOn: true,
    };
  }

  onNavBar() {
    this.setState({
      navBarOn: true,
    });
  }

  offNavBar() {
    this.setState({
      navBarOn: false,
    });
  }

  toggleNavBar() {
    this.setState({
      navBarOn: !this.state.menuOpen,
    });
  }

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  }

  render() {
    const props = this.props;
    const toggleMenu = this.toggleMenu;
    return (
      <Router>
        {
          (!props.loading) ?
            <MuiThemeProvider>
              <div className="App">
                {(this.state.navBarOn) ?
                  <Navigation
                    {...props}
                    toggleMenu={toggleMenu}
                  />
                  :
                  ''
                }

                <Switch>
                  <Route
                    exact
                    path="/files/:fileId"
                    component={Download}
                    {...props}
                  />
                  <AllUserAccess
                    exact
                    path="/"
                    component={Index}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/dashboard"
                    component={ClientDashboard}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/forms/add"
                    component={AddSchema}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/forms/:formId/"
                    component={EditSchema}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/forms"
                    component={ViewSchema}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/students"
                    component={Students}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/students/add"
                    component={AddStudent}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/students/view/:id/"
                    component={ViewStudent}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/students/edit/:_id"
                    component={EditStudent}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/documents"
                    component={ClientDocuments}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/documents/new"
                    component={ClientNewDocument}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/documents/view/:_id"
                    component={ClientViewDocument}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/documents/edit/:_id/"
                    component={ClientEditDocument}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <ClientAdmin
                    exact
                    path="/:username/admin/profile"
                    component={ClientProfile}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <UserAdmin
                    exact
                    path="/:username/user/dashboard"
                    component={UserDashboard}
                    {...props}
                    menuOpen={this.state.menuOpen}
                  />
                  <Public
                    exact
                    path="/signup"
                    component={Signup}
                    {...props}
                  />
                  <Public
                    exact
                    path="/login"
                    component={Login}
                    {...props}
                  />
                  <Public
                    exact
                    path="/logout"
                    component={Logout}
                    {...props}
                  />
                  <AllUserAccess
                    name="verify-email"
                    path="/verify-email/:token"
                    component={VerifyEmail}
                  />
                  <AllUserAccess
                    name="recover-password"
                    path="/recover-password"
                    component={RecoverPassword}
                  />
                  <AllUserAccess
                    name="reset-password"
                    path="/reset-password/:token"
                    component={ResetPassword}
                  />
                  <AllUserAccess
                    name="terms"
                    path="/terms"
                    component={Terms}
                  />
                  <AllUserAccess
                    name="privacy"
                    path="/privacy"
                    component={Privacy}
                  />
                  <AllUserAccess
                    component={NotFound}
                  />
                </Switch>
              </div>
            </MuiThemeProvider>
            : ''
        }
      </Router>
    );
  }
}


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

  // TODO Remove these subs
  const studentList = Meteor.subscribe('students');
  const uploadList = Meteor.subscribe('uploads');

  return {
    students: StudentsCollection.find({}).fetch(), // TODO Remove this sub
    uploads: UploadsCollection.find({}).fetch(),
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
