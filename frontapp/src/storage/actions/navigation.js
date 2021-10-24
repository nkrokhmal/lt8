import {ActionType} from 'storage/ActionType';


export const changeElements = (elements) => (dispatch) => dispatch({
  type: ActionType.NavigationElementsChange,
  elements
});
