import * as React from 'react';
import { Button, Checkbox, Form, Icon, Input } from 'antd';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import classNames from 'classnames';
import styles from './styles.scss';


class LoginFormComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: ''
    };

    bindAll(this, [
      'onLoginChange',
      'onPasswordChange',
      'onSubmitClick'
    ]);
  }

  onLoginChange(e) {
    const login = e.target.value;

    this.setState(() => ({ login }));
  }

  onPasswordChange(e) {
    const password = e.target.value;

    this.setState(() => ({ password }));
  }

  onSubmitClick(e) {
    e.preventDefault();
    const { login, password } = this.state;

    this.props.onSubmit(login, password);
  }

  // eslint-disable-next-line max-lines-per-function, complexity
  render() {
    const { error, form } = this.props;
    const { login, password } = this.state;

    return (
      <Form
        className={classNames('login-form', styles.forms_login)}
        onSubmit={this.onSubmitClick}
      >
        <Form.Item label={'Email'}>
          {form.getFieldDecorator('login', {
            rules: [{ required: true, message: 'Пожалуйста, введите Ваш email' }]
          })(
            <Input
              onChange={this.onLoginChange}
              placeholder={'Email'}
              prefix={<Icon className={styles.forms_login_input_icon} type="user" />}
            />
          )}
        </Form.Item>
        <Form.Item label={'Пароль'}>
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Пожалуйста, введите Ваш пароль' }]
          })(
            <Input
              onChange={this.onPasswordChange}
              placeholder={'Пароль'}
              prefix={<Icon className={styles.forms_login_input_icon} type="lock" />}
              type="password"
            />
          )}
        </Form.Item>
        {error && (
          <Form.Item>
            <span className={styles.forms_login_error}>Неверные логин или пароль.</span>
          </Form.Item>
        )}
        <Form.Item>
          <div className={styles.forms_login_rememberAndForgot}>
            {form.getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>{'Запомнить меня'}</Checkbox>)}

            <a
              className={classNames(                
                styles.pull_right,
                styles.forms_login_link_forgot
              )}
              onClick={this.props.onForgot}
            >
              Забыли пароль?
            </a>
          </div>
        </Form.Item>
        <div className="form-actions">
          <div className={styles.forms_login_submitAndRegister}>
            <Button
              className="login-form-button"
              disabled={!login || !password}
              htmlType="submit"
              type="primary"
            >
              Войти
            </Button>
            <div>
              <a
                onClick={this.props.onRegister}
              >
                Зарегистрируйтесь
              </a>
              , если у Вас нет аккаунта
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

LoginFormComponent.propTypes = {
  error: PropTypes.bool,
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired
  }).isRequired,
  onForgot: PropTypes.func,
  onRegister: PropTypes.func,
  onSubmit: PropTypes.func
};

LoginFormComponent.defaultProps = {
  error: false,
  onForgot: () => null,
  onRegister: () => null,
  onSubmit: () => null
};

const LoginForm = Form.create()(LoginFormComponent);

export default LoginForm;
