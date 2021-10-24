
import ActionType from 'constants/actionTypes';

export const changeAccountData = (account, user) => (dispatch) =>
  dispatch({
    type: ActionType.ACCOUNT_CHANGE_ACCOUNT_DATA,
    account,
    user
  });

export const auth = (user, account) => ({ type: ActionType.AUTH_LOGIN, user, account });

export const logout = () => (dispatch) => dispatch({ type: ActionType.AUTH_LOGOUT });