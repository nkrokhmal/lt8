import * as React from 'react';
import { LogoutWidget } from 'views/widgets';
import { withRouter } from 'react-router-dom';


const Logout = () => <LogoutWidget />;

export default withRouter(Logout);
