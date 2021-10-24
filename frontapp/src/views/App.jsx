import * as React from 'react';
import { AccountProvider } from 'data/providers';
import { BrowserRouter } from 'react-router-dom';
import Model from 'data/models';
import PropTypes from 'prop-types';
import Routes from '../Routes';
import { actions } from 'storage';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import 'styles/antd.less';
import './App.scss';


const MOBILE_VIEW_WIDTH_MAX = 768;
const LOAD_ACCOUNT_DELAY = 200;
const wait = (delay) => new Promise((resolve) => setTimeout(() => resolve(), delay));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: true
    };

    bindAll(this, ['onResize']);
  }

  componentDidMount() {
    this.onResize();
    this.load();

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  async load() {
    this.setState(() => ({ pending: true }));

    this._accountProvider = new AccountProvider();
    this._accountProvider.loadAccount();

    // Hack: wait several ms for load account data and navigate to selected URL.
    await wait(LOAD_ACCOUNT_DELAY);

    this.setState(() => ({ pending: false }));
  }

  onResize() {
    const { settings } = this.props;

    const mobileViewState = window.innerWidth < MOBILE_VIEW_WIDTH_MAX;

    if (mobileViewState !== settings.isMobileView) {
      this.props.toggleMobileView(mobileViewState);
    }
  } 

  render() {
    const { account } = this.props;
    const { pending } = this.state;

    if (pending) {
      return null;
    }

    return (
      <BrowserRouter>
        <Routes account={account} />
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  account: PropTypes.instanceOf(Model.Account),
  settings: PropTypes.shape({
    isMobileView: PropTypes.bool.isRequired
  }).isRequired,
  toggleMobileView: PropTypes.func.isRequired,
};

App.defaultProps = {
  account: null
};

const mapStateToProps = (store) => ({
  account: store.auth.account,
  settings: store.settings
});

export default connect(mapStateToProps, {
  toggleMobileView: actions.settings.toggleMobileView
})(App);
