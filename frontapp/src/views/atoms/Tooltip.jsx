import * as React from 'react';
import { Tooltip as AntTooltip } from 'antd';
import PropTypes from 'prop-types';


const Tooltip = ({ children, content }) => {
  return (
    <AntTooltip title={content}>
      {children}
    </AntTooltip>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.string.isRequired
};

export default Tooltip;