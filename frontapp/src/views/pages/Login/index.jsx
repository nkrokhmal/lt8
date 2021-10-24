import * as React from 'react';
import Layout from 'views/layouts';
import { LoginWidget } from 'views/widgets';
import { withRouter } from 'react-router-dom';


const LoginPage = () => (
  <Layout.Page.Login>
    <LoginWidget />
  </Layout.Page.Login>
);

export default withRouter(LoginPage);
