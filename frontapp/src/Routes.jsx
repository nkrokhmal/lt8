import * as React from 'react';
import {
  Dialogue,
  Dialogues,
  Upload,
  Videocall
} from 'views/pages';
import { Redirect, Switch, withRouter } from 'react-router-dom';
import Layout from 'views/layouts';
import Route from './CustomRoute';


const Routes = ({ location }) => {
  return (
    <Layout.Page.Main>
      <Switch location={location}>
        <Route component={Dialogues} path="/dialogues" />
        <Route component={Dialogue} path="/dialogue/:id" />
        <Route component={Upload} path="/upload" />
        <Route component={Videocall} path="/videocall/:userId" />

        <Redirect to="/dialogues" />
      </Switch>
    </Layout.Page.Main>
  );
};

export default withRouter(Routes);
