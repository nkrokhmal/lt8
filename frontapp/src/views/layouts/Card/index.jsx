import * as React from 'react';
import Cover from '../Cover';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styles.scss';


const Card = ({additionalClassName, children, pending, title, subtitle, action}) => (
  <div className={classNames('card', styles.layouts_card, additionalClassName)}>
    {title && (
      <div className="card-header">
        <div className={styles.layouts_card_title}>{title}</div>
        {subtitle && <div className={styles.layouts_card_subtitle}>{subtitle}</div>}
        {action && <div className={styles.layouts_card_action}>{action}</div>}
      </div>
    )}

    <div className={classNames('card-body')}>
      {pending !== null && (
        <Cover pending={pending}>
          {children}
        </Cover>
      )}
      {pending === null && children}
    </div>
  </div>
);

Card.propTypes = {
  additionalClassName: PropTypes.string,
  children: PropTypes.node,
  pending: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

Card.defaultProps = {
  additionalClassName: null,
  children: null,
  pending: null,
  title: null,
  subtitle: null
};

export default Card;
