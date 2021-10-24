import * as React from 'react';
import Logo from './Logo';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';


const Cover = ({additionalClassName, children, pending, small}) => {
  const items = Array.isArray(children)
    ? children
    : [children];

  return (
    <div className={classNames(
      styles.layouts_cover,
      {
        [styles.__noLogo]: small,
        [styles.__pending]: pending,
        [additionalClassName]: additionalClassName
      }
    )}>
      <div className={classNames(
        styles.layouts_cover_wrap
      )}>
        <Logo />
      </div>
      {items}
    </div>
  );
};

Cover.propTypes = {
  additionalClassName: PropTypes.string,
  children: PropTypes.node,
  pending: PropTypes.bool,
  small: PropTypes.bool
};

Cover.defaultProps = {
  additionalClassName: null,
  children: null,
  pending: true,
  small: false
};

Cover.Logo = Logo;

export default Cover;
