import * as Network from 'constants/Network';
import { LocalStorageProvider } from 'data/providers';
import axios from 'axios';
import { message } from 'antd';
import { cwd } from 'process';


class BaseClient {
  constructor(
    host = Network.DEFAULT_HOST,
    apiRoot = Network.DEFAULT_API_ROOT,
    protocol = Network.DEFAULT_PROTOCOL,
    timeout = Network.DEFAULT_TIMEOUT,
    token
  ) {
    this._baseUrl = `${protocol}://${host}/${apiRoot}`;
    this._timeout = timeout;
    this._headers = {};

    /*
     * The canceletion possibility is necessary to fix bug when user had logout exactly at that time when
     * all requests had not already resolved. There are situation when data downloaded from first user passes
     * in redux-store and second user can't reload own data and can read and access first user's data.
     * https://github.com/axios/axios#cancellation
     */
    const cancelToken = axios.CancelToken;

    this._source = cancelToken.source();

    if (token) {
      this._headers.Authorization = token;
    } else {
      this._localStorageProvider = new LocalStorageProvider();
      const user = this._localStorageProvider.load('apprtcuser');

      if (user) {
        this._headers.Authorization = `Bearer ${user.token}`;
      }
    }

    this._instance = axios.create({
      baseURL: this._baseUrl,
      timeout: this._timeout,
      headers: this._headers,
      cancelToken: this._source.token
    });
  }

  async request (config, formData = false) {
    if (formData) {
      this._headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    
    try {
      const response = await this._instance.request(config);

      if (!response) {
        throw new Error('Network is unavaliable');
      }


      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }

      return null;
    } catch (e) {
      console.error(`Can't request data from '${config && config.url}'. Error: ${e.message || e}`);

      if (e.response.status === 403) {        
        message.error('Авторизация больше не актуальна. Пожалуйста, войдите в систему еще раз.');
        setTimeout(() => {
          this._localStorageProvider.remove('apprtcuser');
          window.document.location.pathname = '/login';
        }, 1500);
      }

      return Promise.reject(e);
    }
  }

  get (url, params = {}, defaults = {}) {
    const config = {
      method: 'get',
      url,
      params,
      ...defaults
    };

    return this.request(config);
  }

  post (url, data = {}, params = {}, formData = false) {
    const config = {
      method: 'post',
      url,
      params,
      data
    };

    return this.request(config, formData);
  }

  put (url, data = {}, formData = false) {
    const config = {
      method: 'put',
      url,
      params: {},
      data
    };

    return this.request(config, formData);
  }

  delete (url, params = {}) {
    const config = {
      method: 'delete',
      url,
      params
    };

    return this.request(config);
  }

  cancel () {
    this._source.cancel('Operation canceled manually');
  }
}

export default BaseClient;
