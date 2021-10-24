import * as React from 'react';
import {Avatar, Dropdown, Menu} from 'antd';
import Icon from 'views/atoms/Icon';
import {Model} from 'data';
import PropTypes from 'prop-types';
import {bindAll} from 'lodash';
import classNames from 'classnames';
import {connect} from 'react-redux';
import styles from './styles.scss';
import {withRouter} from 'react-router-dom';


class Profile extends React.Component {
  constructor (props) {
    super(props);

    bindAll(this, [
      'logout',
      'showAccount'
    ]);
  }

  logout () {
    this.props.history.push('/logout');
  }

  showAccount () {
    this.props.history.push('/account');
  }

  render () {
    const {user} = this.props;

    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <a onClick={this.logout}>
            <i className={classNames(styles.layouts_header_profile_menuIcon, 'icmn-exit')} />
            Выход
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown
        overlay={menu}
        trigger={['click']}
      >
        <div className={styles.layouts_header_profile_dropdown}>
          {user._avatar
            ? <img
              alt="your_image"
              className={styles.layouts_header_profile_avatar}
              height="40"
              // src={user._avatar}
              src={'/img/noavatar.jpg'}
              width="40"
              onError={(e) => {
                e.target.src = '/img/noavatar.jpg';                  
              }}
            />
            : <Avatar
              className={styles.layouts_header_profile_avatar}
              shape="square"
              size="large">
              <Icon icon={Icon.List.UserCircle} />
            </Avatar>}
        </div>
      </Dropdown>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  translate: PropTypes.func,
  user: PropTypes.instanceOf(Model.Account)
};

Profile.defaultProps = {
  translate: () => null,
  user: null
};

const mapStateToProps = (state) => ({
  user: state.auth.account
});

export default connect(mapStateToProps, {})(withRouter(Profile));
