import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import ActionType from 'constants/actionTypes';
import actions from './actions';
import reducers from './reducers';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const resultReducer = combineReducers({
  ...reducers
});

const storage = createStore(
  (state, action) => {
    if (action.type === ActionType.AUTH_LOGOUT) {
      return {
        auth: {},
        settings: {
          ...state.settings
        },
        navigation: {
          ...state.navigation
        }
      };
    }

    return resultReducer(state, action);
  },
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export default storage;

export {actions};
