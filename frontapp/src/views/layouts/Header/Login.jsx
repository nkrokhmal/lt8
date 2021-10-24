import * as React from 'react';
import {Layout} from 'antd';
import classNames from 'classnames';
import styles from './styles.scss';


const HeaderLogin = () => (
  <Layout.Header className={classNames(styles.layouts_header, styles.login)}>
    <div className="mr-auto" />
  </Layout.Header>
);

export default HeaderLogin;
