import { changeAccountData, logout } from 'storage/actions/auth';
import { AccountClient } from 'data/clients';
import LocalStorageProvider from './LocalStorageProvider';
import Model from 'data/models';
import jwtDecode from 'jwt-decode';
import storage from 'storage';


const ACCOUNT_DATA_KEY = 'apprtcuser';

class AccountProvider {
  constructor() {
    this._accountClient = new AccountClient();
    this._localStorage = new LocalStorageProvider();
  }

  // eslint-disable-next-line
  loadAccount() {

    const userStorage = this._localStorage.load(ACCOUNT_DATA_KEY);

    let account = userStorage
      ? Model.Account.deserialize(userStorage)
      : null;

    changeAccountData(account, userStorage)(storage.dispatch, storage.getState);
  }


  async login(login, password, remember) {
    const response = await this._accountClient.login(login, password, remember);

    const user = jwtDecode(response.access_token);

    user.token = response.access_token;
    user.isExtended = user.isExtended === 'True';
    // handle image caching
    user.avatar = `${user.avatar}?${user.exp}`;
    this._localStorage.save(ACCOUNT_DATA_KEY, user);

    this.loadAccount();
  }

  logout() {
    this._localStorage.remove(ACCOUNT_DATA_KEY);

    logout()(storage.dispatch, storage.getState);
  }

  resetPassword(login) {
    return this._accountClient.changePassword({ userName: login });
  }

  // eslint-disable-next-line class-methods-use-this
  getToken() {
    const { account } = storage.getState().auth;

    return account
      ? account.token
      : null;
  }

  // eslint-disable-next-line class-methods-use-this
  isAuthorized() {
    const { account } = storage.getState().auth;

    return account && account.token;
  }
}

export default AccountProvider;
