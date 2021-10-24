import * as React from 'react';
import styles from './styles.scss';


const CIRCLE_SIZE_PX = 4;

const getCircle = (className, circleSize) => (
  <div className={className}>
    <svg>
      <circle cx={circleSize} cy={circleSize} r={circleSize} />
    </svg>
  </div>
);

const Logo = () => (
  <div className={styles.layouts_cover_logo}>
    <div className={styles.layouts_cover_image}>
      <img alt="logo" src="/img/logo_quad.svg" />
    </div>
    <div className={styles.layouts_cover_circles}>
      {getCircle(styles.layouts_cover_circle1, CIRCLE_SIZE_PX)}
      {getCircle(styles.layouts_cover_circle2, CIRCLE_SIZE_PX)}
      {getCircle(styles.layouts_cover_circle3, CIRCLE_SIZE_PX)}
    </div>
  </div>
);

export default Logo;
