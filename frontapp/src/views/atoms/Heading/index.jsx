import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Heading = ({ TagName, children, className }) => {
  return (
    <TagName className={className}>{children}</TagName>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  TagName: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

Heading.defaultProps = {
  className: styles.font_extra_bold,
  TagName: 'h1'
};


export default Heading;