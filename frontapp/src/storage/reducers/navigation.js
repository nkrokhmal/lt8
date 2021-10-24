import { ActionType } from 'storage/ActionType';


// eslint-disable-next-line max-lines-per-function
const getInitialState = () => ({
  elements: [
    {
      label: 'Конференции',
      key: 'dialogues',
      url: '/dialogues',
      icon: 'icmn icmn-bubbles3'
    },
    {
      label: 'Загрузить файл',
      key: 'upload',
      url: '/upload',
      icon: 'icmn icmn-cloud-upload'
    },
    {
      label: 'Режим диктофона',
      key: 'videocall',
      url: '/videocall',
      icon: 'icmn icmn-bubbles4'
    }
  ]
});


const navigation = (state = getInitialState(), action = {}) => {
  switch (action.type) {
    case ActionType.NavigationElementsChange:
      return { ...state, elements: action.elements };

    default:
      return state;
  }
};

export default navigation;
