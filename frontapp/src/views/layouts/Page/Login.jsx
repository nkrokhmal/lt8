import * as React from 'react';
import { BackTop, ConfigProvider, Layout } from 'antd';
import Footer from '../Footer';
import Header from '../Header';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styles from './styles.scss';


/* eslint-disable quote-props */
const PageLogin = ({ additionalClassName, children, settings }) => (
  <ConfigProvider>
    <Layout className={classNames(
      styles.layouts_page,
      styles.layouts_page_main,
      additionalClassName,
      {
        'settings__borderLess': settings.isBorderless,
        'settings__squaredBorders': settings.isSquaredBorders,
        'settings__fixedWidth': settings.isFixedWidth,
        'settings__menuShadow': settings.isMenuShadow,
        'settings__menuTop': settings.isMenuTop
      }
    )}>
      <BackTop />

      <Layout>
        <Header.Login />

        <Layout.Content className={styles.layouts_page_main_content}>
          {children}
        </Layout.Content>

        <Footer.Login />
      </Layout>
    </Layout>
  </ConfigProvider>
);
/* eslint-enable quote-props */

PageLogin.propTypes = {
  additionalClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  settings: PropTypes.shape({
    isBorderless: PropTypes.bool,
    isSquaredBorders: PropTypes.bool,
    isFixedWidth: PropTypes.bool,
    isMenuShadow: PropTypes.bool,
    isMenuTop: PropTypes.bool
  })
};

PageLogin.defaultProps = {
  additionalClassName: null,
  settings: {
    isBorderless: true,
    isSquaredBorders: false,
    isFixedWidth: false,
    isMenuShadow: true,
    isMenuTop: false
  }
};

const mapStateToProps = (state) => ({
  language: state.settings.language
});

export default connect(mapStateToProps)(PageLogin);
