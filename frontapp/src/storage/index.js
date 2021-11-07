import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import actions from './actions';
import reducers from './reducers';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const resultReducer = combineReducers({
  ...reducers
});

const storage = createStore(
  (state, action) => {
    return resultReducer(state, action);
  },
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default storage;

export {actions};
