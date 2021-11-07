import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Routes from '../Routes';
import { actions } from 'storage';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';
import 'styles/antd.less';
import './App.scss';


const MOBILE_VIEW_WIDTH_MAX = 768;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false
    };

    bindAll(this, ['onResize']);
  }

  componentDidMount() {
    this.onResize();

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    const { settings } = this.props;

    const mobileViewState = window.innerWidth < MOBILE_VIEW_WIDTH_MAX;

    if (mobileViewState !== settings.isMobileView) {
      this.props.toggleMobileView(mobileViewState);
    }
  } 

  render() {
    const { pending } = this.state;

    if (pending) {
      return null;
    }

    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  settings: PropTypes.shape({
    isMobileView: PropTypes.bool.isRequired
  }).isRequired,
  toggleMobileView: PropTypes.func.isRequired,
};


const mapStateToProps = (store) => ({
  settings: store.settings
});

export default connect(mapStateToProps, {
  toggleMobileView: actions.settings.toggleMobileView
})(App);
