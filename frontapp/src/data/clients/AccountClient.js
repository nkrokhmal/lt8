import * as Network from 'constants/Network';
import BaseClient from './BaseClient';


class AccountClient extends BaseClient {
  constructor (
    host = Network.DEFAULT_HOST,
    protocol = Network.DEFAULT_PROTOCOL
  ) {
    super(host, 'login', protocol);
  }

  registration ({
    fullName,
    email,
    password
  }) {
    return this.post('/register', {
      fullName,
      email,
      password
    });
  }

  login (login, password, remember) {    
    const data = new URLSearchParams();
    data.append('username', login);
    data.append('password', password);
    // data.append('scope', undefined);
    // data.append('client_id', undefined);
    // data.append('client_secret', undefined);

    return this.post('/access_token', data, undefined, true);
  }

  changePassword (payload) {
    return this.post('/ChangePassword', payload);
  }
}

export default AccountClient;
