import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.scss';


/* eslint-disable sort-imports */
import {
  faAdjust,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faArrowDown,
  faArrowLeft,
  faArrowUp,
  faBold,
  faBolt,
  faBorderStyle,
  faChartPie,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faChevronDown,
  faChevronUp,
  faCircle,
  faClone,
  faCog,
  faCopy,
  faCrosshairs,
  faEdit,
  faFemale,
  faFilm,
  faFillDrip,
  faFont,
  faImage,
  faInfo,
  faItalic,
  faLayerGroup,
  faList,
  faMale,
  faMapMarkedAlt,
  faMinus,
  faPaintBrush,
  faPhotoVideo,
  faPlay,
  faPause,
  faPlus,
  faPuzzlePiece,
  faQrcode,
  faRedo,
  faSortUp,
  faSortDown,
  faShoppingCart,
  faSignOutAlt,
  faTabletAlt,
  faTachometerAlt,
  faTimes,
  faTimesCircle,
  faTrash,
  faUnderline,
  faUndo,
  faUserFriends,
  faVideo,
  faWarehouse,
  faUpload,
  faCaretRight,
  faCaretLeft
} from '@fortawesome/free-solid-svg-icons';

import {
  faChartBar as faChartBarRegular,
  faCircle as faCircleRegular,
  faCopy as faCopyRegular,
  faEdit as faEditRegular,
  faFrown as faFrownRegular,
  faMeh as faMehRegular,
  faMinusSquare as faMinusSquareRegular,
  faPlusSquare as faPlusSquareRegilar,
  faSmile as faSmileRegular,
  faTimesCircle as faTimesCircleRegular,
  faTrashAlt as faTrashAltRegular,
  faQuestionCircle as faQuestionCircleRegular,
  faUserCircle as faUserCircleRegular
} from '@fortawesome/free-regular-svg-icons';
/* eslint-enable sort-imports */

library.add(
  faAdjust,
  faAlignCenter,
  faAlignJustify,
  faAlignLeft,
  faAlignRight,
  faArrowDown,
  faArrowLeft,
  faArrowUp,
  faBold,
  faBolt,
  faBorderStyle,
  faChartBarRegular,
  faChartPie,
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faChevronDown,
  faChevronUp,
  faCircle,
  faCircleRegular,
  faClone,
  faCog,
  faCopy,
  faCopyRegular,
  faCrosshairs,
  faEdit,
  faEditRegular,
  faFemale,
  faFilm,
  faFillDrip,
  faFont,
  faPhotoVideo,
  faFrownRegular,
  faImage,
  faInfo,
  faItalic,
  faLayerGroup,
  faList,
  faMale,
  faMapMarkedAlt,
  faMehRegular,
  faMinus,
  faMinusSquareRegular,
  faPaintBrush,
  faPlay,
  faPause,
  faPlus,
  faPlusSquareRegilar,
  faPuzzlePiece,
  faQrcode,
  faQuestionCircleRegular,
  faRedo,
  faSortUp,
  faSortDown,
  faShoppingCart,
  faSignOutAlt,
  faSmileRegular,
  faTabletAlt,
  faTachometerAlt,
  faTimes,
  faTimesCircle,
  faTimesCircleRegular,
  faTrash,
  faTrashAltRegular,
  faUnderline,
  faUndo,
  faUpload,
  faUserFriends,
  faUserCircleRegular,
  faVideo,
  faWarehouse,
  faCaretRight,
  faCaretLeft
);

const ICONS = {
  Adjust: ['fas', 'adjust'],
  AlignCenter: ['fas', 'align-center'],
  AlignJustify: ['fas', 'align-justify'],
  AlignLeft: ['fas', 'align-left'],
  AlignRight: ['fas', 'align-right'],
  ArrowDown: ['fas', 'arrow-down'],
  ArrowLeft: ['fas', 'arrow-left'],
  ArrowUp: ['fas', 'arrow-up'],
  Back: ['fas', 'undo'],
  Bold: ['fas', 'bold'],
  Border: ['fas', 'border-style'],
  Brush: ['fas', 'paint-brush'],
  Bolt: ['fas', 'bolt'],
  Circle: ['fas', 'circle'],
  CaretLeft: ['fas', 'caret-left'],
  CaretRight: ['fas', 'caret-right'],
  ChartBar: ['far', 'chart-bar'],
  ChartPie: ['fas', 'chart-pie'],
  Check: ['fas', 'check'],
  CheckCircle: ['fas', 'check-circle'],
  CheckDouble: ['fas', 'check-double'],
  Clone: ['fas', 'clone'],
  Cog: ['fas', 'cog'],
  Copy: ['far', 'copy'],
  CopySolid: ['fas', 'copy'],
  Cross: ['fas', 'times'],
  CrossCircle: ['far', 'times-circle'],
  CrossCircleSolid: ['fas', 'times-circle'],
  Crosshairs: ['fas', 'crosshairs'],
  Down: ['fas', 'chevron-down'],
  Edit: ['far', 'edit'],
  EditSolid: ['fas', 'edit'],
  Female: ['fas', 'female'],
  Film: ['fas', 'film'],
  FillDrip: ['fas', 'fill-drip'],
  Font: ['fas', 'font'],
  Frown: ['far', 'frown'],
  Image: ['fas', 'image'],
  Info: ['fas', 'info'],
  Italic: ['fas', 'italic'],
  LayerGroup: ['fas', 'layer-group'],
  List: ['fas', 'list'],
  Male: ['fas', 'male'],
  MapMarked: ['fas', 'map-marked-alt'],
  Meh: ['far', 'meh'],
  Minus: ['fas', 'minus'],
  MinusSquare: ['far', 'minus-square'],
  PhotoVideo: ['fas', 'photo-video'],
  Play: ['fas', 'play'],
  Pause: ['fas', 'pause'],
  Plus: ['fas', 'plus'],
  PlusSquare: ['far', 'plus-square'],
  Puzzle: ['fas', 'puzzle-piece'],
  Qrcode: ['fas', 'qrcode'],
  Rotate: ['fas', 'redo'],
  SortDown: ['fas', 'sort-down'],
  SortUp: ['fas', 'sort-up'],
  ShoppingCart: ['fa', 'shopping-cart'],
  SignOut: ['fas', 'sign-out-alt'],
  Smile: ['far', 'smile'],
  Tablet: ['fas', 'tablet-alt'],
  Tachometer: ['fas', 'tachometer-alt'],
  TachometerAlt: ['fa', 'tachometer-alt'],
  Trash: ['fas', 'trash'],
  Times: ['fas', 'times'],
  TrashAlt: ['far', 'trash-alt'],
  QuestionCircleRegular: ['far', 'question-circle'],
  Underline: ['fas', 'underline'],
  Up: ['fas', 'chevron-up'],
  Upload: ['fas', 'upload'],
  UserCircle: ['far', 'user-circle'],
  UserFriends: ['fas', 'user-friends']
};

/* eslint-disable id-length */
const SIZE = {
  XS: 'xs',
  S: 'sm',
  M: 'lg',
  L: '2x',
  XL: '3x',
  XXL: '5x'
};

const COLOR = {
  Danger: 'text-danger',
  Regular: '',
  Success: 'text-success',
  Warning: 'text-warning'
};

/* eslint-enable id-length */

const Icon = ({ className, icon, onClick, size, color }) => (
  <div className={classNames(styles.atoms_icon, className)} onClick={onClick}>
    <FontAwesomeIcon className={color} icon={icon} size={size} />
  </div>
);

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(Object.values(SIZE))
};

Icon.defaultProps = {
  className: null,
  color: '',
  onClick: () => null,
  size: SIZE.M
};

Icon.List = ICONS;
Icon.Size = SIZE;
Icon.Color = COLOR;

export default Icon;
