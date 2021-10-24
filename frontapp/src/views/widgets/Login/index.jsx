import * as React from 'react';
import { AccountProvider } from 'data/providers';
import Form from 'views/forms';
import Layout from 'views/layouts';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import { message } from 'antd';
import styles from './styles.scss';
import { withRouter } from 'react-router-dom';


class LoginWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pending: false,
      error: false
    };

    bindAll(this, [
      'login',
      'forgot',
      'register'
    ]);

    this._accountProvider = new AccountProvider();
  }

  async login(login, password, remember) {
    this.setState(() => ({ pending: true, error: false }));
    try {
      await this._accountProvider.login(login, password, remember);
      this.props.history.push('/');
    } catch (e) {
      console.error(`Can't login. Error: ${e.message}`);

      if (e.response && e.response.status === 401) {
        this.setState(() => ({
          error: true
        }));
      } else if (e.response && e.response.data && e.response.data.message === 'No such user') {
        message.error('Пользователь с таким логином не существует');
      } else {
        message.error('Ошибка. Проверьте интернет соединение или попробуйте перезагрузить страницу');
      }
    } finally {
      this.setState(() => ({
        pending: false
      }));
    }
  }

  forgot() {
    this.props.history.push('/recovery');
  }

  register() {
    this.props.history.push('/registration');
  }

  render() {
    const { pending, error } = this.state;

    return (
      <div className={styles.widgets_login}>
        <div className={styles.widgets_login_form}>
          <div className={styles.widgets_login_logo} />
          <Layout.Cover pending={pending} small>
            <div className={styles.widgets_login_formTitle}>
              <p>Пожалуйста, войдите в свой аккаунт.</p>
            </div>

            <Form.Login
              error={error}
              onForgot={this.forgot}
              onRegister={this.register}
              onSubmit={this.login}
            />
          </Layout.Cover>
        </div>
      </div>
    );
  }
}

LoginWidget.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  translate: PropTypes.func
};

LoginWidget.defaultProps = {
  translate: () => null
};

export default withRouter(LoginWidget);
