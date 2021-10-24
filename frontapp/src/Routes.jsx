import * as React from 'react';
import {
  Dialogue,
  Dialogues,
  Upload,
  Login,
  Logout,
  Videocall
} from 'views/pages';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import Layout from 'views/layouts';
import Model from 'data/models';
import PropTypes from 'prop-types';
import Route from './CustomRoute';


const Routes = ({ account, location }) => {
  if (!account) {
    return (
      <Switch location={location}>
        <Route component={Login} path="/login" />
        <Route component={Videocall} path="/videocall/:userId" />
        <Redirect to="/login" />
      </Switch>
    );
  } else {
    return (
      <Layout.Page.Main>
        <Switch location={location}>
          <Route component={Dialogues} path="/dialogues" />
          <Route component={Dialogue} path="/dialogue/:id" />
          <Route component={Upload} path="/upload" />
          <Route component={Videocall} path="/videocall/:userId" />

          <Route component={Logout} path="/logout" />

          <Redirect to="/dialogues" />
        </Switch>
      </Layout.Page.Main>
    );
  }
};

Routes.propTypes = {
  account: PropTypes.instanceOf(Model.Account),
  location: PropTypes.shape({}).isRequired
};

Routes.defaultProps = {
  account: null
};

export default withRouter(Routes);
