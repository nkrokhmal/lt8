import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';


const MenuNotification = ({ link, text, title }) => (
  <div className={styles.layouts_menu_notification}>
    <p>
      <strong>{title}</strong>
    </p>
    {text && (
      <p>
        {text}
      </p>
    )}
    <a
      className={styles.btn_danger}
      href={link.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {link.label}
    </a>
  </div>
);

MenuNotification.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  }).isRequired,
  text: PropTypes.string,
  title: PropTypes.string.isRequired
};

MenuNotification.defaultProps = {
  text: null
};

export default MenuNotification;
