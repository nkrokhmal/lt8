import {ActionType} from 'storage/ActionType';


export const toggleMobileMenu = (state) => (dispatch) => dispatch({
  type: ActionType.SettingsMobileMenuToggle,
  state
});

export const toggleMobileView = (state) => (dispatch) => dispatch({
  type: ActionType.SettingsMobileViewToggle,
  state
});

export const toggleMenuOpened = (state) => (dispatch) => dispatch({
  type: ActionType.SettingsMenuOpenedToggle,
  state
});
