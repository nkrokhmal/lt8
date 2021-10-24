import * as React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { actions } from 'storage';
import { bindAll } from 'lodash';
import classNames from 'classnames';
import { LocalStorageProvider } from 'data/providers';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid'
import styles from './styles.scss';


class MenuLeft extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: [],
      openElements: []
    };

    // ид для режима диктофона
    this._storage = new LocalStorageProvider();
    let guid = this._storage.load('apprtc_session_id');
    if (!guid) {
      guid = nanoid();
      this._storage.save('apprtc_session_id', guid);
    }
    this.sessionId = guid;

    bindAll(this, [
      'onCollapse',
      'onOpenChange',
      'handleClick'
    ]);
  }

  onCollapse(value, type) {
    const { isMenuOpened } = this.props.settings;

    if (type === 'responsive' && !isMenuOpened) {
      return;
    }

    this.props.toggleMenuOpened(!isMenuOpened);

    this.setState({
      openElements: []
    });
  }

  onOpenChange(openElements) {
    // store.set('app.menu.openedKeys', openedKeys)
    this.setState(() => ({ openElements: openElements.slice(-1) }));
  }

  handleClick(e) {
    this.setState({
      selectedKeys: [e.key]
    });

    this.props.toggleMobileMenu(false);
    document.querySelector('#root').setAttribute('style', '');
  }

  generateMenuItems() {
    const { elements, account, step } = this.props;
    const generateItem = (item) => {
      const { key, label, url, icon, disabled, pro } = item;

      if (item.divider) {
        return <Menu.Divider key={Math.random()} />;
      }

      if (item.url) {
        const content = (
          <React.Fragment>
            <span guide-step={item.step} className={styles.layouts_menu_item_title}>{label}</span>
            {pro && <span className="badge-primary badge-collapsed-hidden ml-2">{'PRO'}</span>}
            {icon && (
              <div className="layouts-menu-icon-wrap">
                <span className={`${icon} ${styles.layouts_menu_icon} icon-collapsed-hidden`} />
              </div>
            )}
          </React.Fragment>
        );

        return (
          <Menu.Item disabled={disabled} key={key}>
            {item.target ? (
              <a href={url} rel="noopener noreferrer" target={item.target}>
                {content}
              </a>
            ) : (
                <Link to={url}>
                  {content}
                </Link>
              )}
          </Menu.Item>
        );
      }
      return (
        <Menu.Item disabled={disabled} key={key} >
          <span className={styles.layouts_menu_item_title}>{label}</span>

          {pro && <span className="badge-primary badge-collapsed-hidden ml-2">{'PRO'}</span>}
          {icon && <span className={`${icon} ${styles.layouts_menu_icon} icon-collapsed-hidden`} />}
        </Menu.Item>
      );
    };

    const generateSubmenu = (items) => {
      return items.map((menuItem) => {
        if (menuItem.children) {
          const subMenuTitle = (
            <React.Fragment key={menuItem.key}>
              <span guide-step={step} className={styles.layouts_menu_item_title}>{menuItem.title}</span>
              {menuItem.icon && <span className={`${menuItem.icon} ${styles.layouts_menu_icon}`} />}
            </React.Fragment>
          );

          return (
            <Menu.SubMenu key={menuItem.key} title={subMenuTitle}>
              {generateSubmenu(menuItem.children)}
            </Menu.SubMenu>
          );
        }
        return generateItem(menuItem);
      });
    }

    return elements
      .reduce((result, menuItem) => {
        if(menuItem.key === 'videocall') {
          return result.concat({
            ...menuItem,
            url: `${menuItem.url}/${this.sessionId}`
          });
        }

        return result.concat(menuItem);
      }, [])
      .map((menuItem) => {
        if (menuItem.children) {
          const subMenuTitle = (
            <React.Fragment key={menuItem.key} >
              <span guide-step={menuItem.step} className={styles.layouts_menu_item_title}>{menuItem.label}</span>
              {menuItem.icon && <span className={`layouts-menu-submenu-icon ${menuItem.icon} ${styles.layouts_menu_icon}`} />}
            </React.Fragment>
          );         

          return (
            <Menu.SubMenu key={menuItem.key} title={subMenuTitle} >
              {generateSubmenu(menuItem.children)}
            </Menu.SubMenu>
          );
        }
        return generateItem(menuItem);
      });
  }

  render() {
    const { selectedKeys } = this.state;
    const { isMobileView, isMenuOpened } = this.props.settings;

    const menu = this.generateMenuItems();

    return (
      <Layout.Sider
        className={classNames(styles.layouts_menu, styles.layouts_menu_left, styles.layouts_menu_light)}
        collapsed={isMobileView
          ? false
          : !isMenuOpened}
        collapsible={!isMobileView}
        onCollapse={this.onCollapse}
        width={256}
      >
        <div className={styles.layouts_menu_logo}>
          <Link to="/">
            <div className={styles.layouts_menu_logoContainer}>
              <img
                alt="logo"
                src={isMenuOpened
                  ? '/img/logo.svg'
                  : '/img/logo_quad.svg'}
              />
            </div>
          </Link>
        </div>
        <Scrollbars
          autoHide
          className={isMobileView
            ? styles.layouts_menu_scrollbarMobile
            : styles.layouts_menu_scrollbarDesktop}
          renderThumbVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                width: '4px',
                borderRadius: 'inherit',
                backgroundColor: '#c5cdd2',
                left: '1px'
              }}
            />
          )}
        >
          <Menu
            className={styles.layouts_menu_navigation}
            mode="inline"
            onClick={this.handleClick}
            onOpenChange={this.onOpenChange}
            selectedKeys={selectedKeys}
            theme="light"
          >
            {menu}
          </Menu>
        </Scrollbars>
      </Layout.Sider>
    );
  }
}

const mapStateToProps = (store) => ({
  account: store.auth.account
});

export default connect(mapStateToProps, {
  toggleMenuOpened: actions.settings.toggleMenuOpened,
  toggleMobileMenu: actions.settings.toggleMobileMenu
})(MenuLeft);