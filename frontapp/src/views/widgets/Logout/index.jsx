import * as React from 'react';
import {AccountProvider} from 'data/providers';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';


class LogoutWidget extends React.PureComponent {
  constructor (props) {
    super(props);

    const provider = new AccountProvider();

    provider.logout();

    this.props.history.push('/login');
  }

  render () {
    return null;
  }
}

LogoutWidget.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(LogoutWidget);
