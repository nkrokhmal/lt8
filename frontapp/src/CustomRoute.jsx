import * as React from 'react';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';


const CustomRoute = (({
  component: Component,
  path
}) => {  
  const title = 'Conference recognition';
  
  return (
    <DocumentTitle title={`${title} | App RTC`}>
      <Route path={path} render={(props) => <Component {...props} />} />
    </DocumentTitle>
  );
}
);

CustomRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }),
  path: PropTypes.string.isRequired
};

export default CustomRoute;
