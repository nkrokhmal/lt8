import * as React from 'react';
import classNames from 'classnames';
import styles from './styles.scss';


const FooterLogin = () => (
  <footer className={classNames(styles.layouts_footer, styles.login)}>
    <div className={styles.layouts_footer_inner}>
      <div className={styles.layouts_footer_copyright}>
        <span>
          <a href="mailto:krokhmal11@mail.ru">{'krokhmal11@mail.ru'}</a>
        </span>
      </div>
    </div>
  </footer>
);

export default FooterLogin;
