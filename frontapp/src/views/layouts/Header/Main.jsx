import * as React from 'react';
import { Layout } from 'antd';
import Profile from './Profile';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styles from './styles.scss';


const HeaderMain = ({ role }) => (
  <Layout.Header className={classNames(styles.layouts_header, styles.main)}>
    <div className="mr-auto" />
    <div className="mr-4">
      <Profile />
    </div>
  </Layout.Header>
);

const mapStateToProps = (store) => ({
  role: store.auth.account.role
});

export default connect(mapStateToProps, {})(HeaderMain);
