import * as React from 'react';
import DrawerMenu from 'rc-drawer';
import MenuLeft from './MenuLeft';
import PropTypes from 'prop-types';
import { actions } from 'storage';
import { bindAll } from 'lodash';
import { connect } from 'react-redux';


class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    bindAll(this, ['toggleOpen']);
  }

  toggleOpen() {
    const { isMobileMenuOpen } = this.props.settings;

    document
      .querySelector('#root')
      .setAttribute(
        'style',
        isMobileMenuOpen
          ? ''
          : 'overflow: hidden; width: 100%; height: 100%;'
      );

    this.props.toggleMobileMenu(!isMobileMenuOpen);
  }

  render() {
    const { elements, settings } = this.props;
    const { isMobileMenuOpen } = settings;

    return (
      <React.Fragment>
        {settings.isMobileView && (
          <DrawerMenu
            className="drawer-light"
            getContainer={null}
            level={null}
            onClose={this.toggleOpen}
            onHandleClick={this.toggleOpen}
            open={isMobileMenuOpen}
          >
            <MenuLeft
              elements={elements}
              settings={settings}
            />
          </DrawerMenu>
        )}
        {!settings.isMobileView && (
          <MenuLeft
            elements={elements}
            settings={settings}
          />
        )}
      </React.Fragment>
    );
  }
}

Menu.propTypes = {
  //elements: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({
    isMenuOpened: PropTypes.bool,
    isMobileView: PropTypes.bool,
    isMobileMenuOpen: PropTypes.bool
  }).isRequired,
  toggleMobileMenu: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  elements: state.navigation.elements,
  settings: state.settings
});

export default connect(mapStateToProps, {
  toggleMobileMenu: actions.settings.toggleMobileMenu
})(Menu);
