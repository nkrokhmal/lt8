import * as React from 'react';
import { Button as ButtonAntd } from 'antd';
import PropTypes from 'prop-types';

const SIZE = {
  Default: 'default',
  Large: 'large',
  Small: 'small'
};

const TYPE = {
  Default: 'default',
  Primary: 'primary',
  Danger: 'danger',
  Dashed: 'dashed'
};

const Button = ({ children, disabled, loading, onClick, size, type }) => (
  <ButtonAntd
    disabled={disabled}
    loading={loading}
    onClick={onClick}
    size={size}
    type={type}
  >
    {children}
  </ButtonAntd>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(SIZE)),
  solid: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(TYPE))
};

Button.defaultProps = {
  disabled: false,
  loading: false,
  onClick: () => null,
  size: SIZE.Default,
  solid: false,
  type: TYPE.Default
};

Button.Type = TYPE;
Button.Size = SIZE;

export default Button;
