import ActionType from 'constants/actionTypes';


const getInitialState = () => ({
  loggedId: false,
  user: null,
  account: null
});

export default function auth (state = getInitialState(), action = {}) {
  switch (action.type) {
    case ActionType.AUTH_LOGIN:
      return {
        loggedIn: true,
        user: action.user,
        account: action.account,
      };

    case ActionType.AUTH_LOGOUT:
      return {
        loggedIn: false
      };

    case ActionType.ACCOUNT_CHANGE_ACCOUNT_DATA:
      return {
        ...state,
        loggedIn: Boolean(action.account),
        user: action.user,
        account: action.account
      };

    default:
      return state;
  }
}
