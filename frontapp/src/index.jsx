import App from 'views/App';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import storage from 'storage';


const renderApp = (AppComponent, storeObj) => {
  const element = document.getElementById('root');

  if (!element) {
    throw new Error('Couldn\'t find element with id root');
  }

  ReactDOM.render(
    <AppContainer>
      <Provider store={storeObj}>
        <AppComponent />
      </Provider>
    </AppContainer>,
    element
  );
};

(() => {
  renderApp(App, storage);

  if (module.hot) {
    module.hot.accept('views/App', () => {
      const NextApp = require('views/App').default;

      renderApp(NextApp, storage);
    });
  }
})();
