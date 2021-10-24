import { ActionType } from 'storage/ActionType';

const getInitialState = () => ({
  isMenuOpened: true,
  isMobileView: false,
  isMobileMenuOpen: false
});

// eslint-disable-next-line complexity
const settings = (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case ActionType.SettingsMobileMenuToggle:
      return { ...state, isMobileMenuOpen: action.state };

    case ActionType.SettingsMobileViewToggle:
      return { ...state, isMobileView: action.state };

    case ActionType.SettingsMenuOpenedToggle:
      return { ...state, isMenuOpened: action.state };

    default:
      return state;
  }
};

export default settings;
