const ReactModules = [
  'react',
  'react-dom',
  'react-router',
  'react-router-dom',
  'history',
  'redux',
  'redux-thunk',
  'create-react-class'
];

const UiModules = [
  'bootstrap',
  '@ant-design',
  'antd',
  'jquery',
  'css-animation'
];

const D3Modules = [
  'd3',
  'd3-axis',
  'd3-color',
  'd3-path',
  'd3-scale',
  'd3-shape',
  'd3-zoom'
];

const RCModules = [
  'rc-align',
  'rc-animate',
  'rc-calendar',
  'rc-cascader',
  'rc-checkbox',
  'rc-collapse',
  'rc-dialog',
  'rc-drawer',
  'rc-dropdown',
  'rc-editor-core',
  'rc-editor-mention',
  'rc-form',
  'rc-hammerjs',
  'rc-input-number',
  'rc-mentions',
  'rc-menu',
  'rc-notification',
  'rc-pagination',
  'rc-progress',
  'rc-rate',
  'rc-resize-observer',
  'rc-select',
  'rc-slider',
  'rc-steps',
  'rc-switch',
  'rc-table',
  'rc-tabs',
  'rc-time-picker',
  'rc-tooltip',
  'rc-tree',
  'rc-tree-select',
  'rc-trigger',
  'rc-upload',
  'rc-util'
];

const VideoJSModules = [
  'video.js',
  'videojs-vtt.js',
  'm3u8-parser',
  'mpd-parser'
];

const RemovedModules = [].concat(
  ReactModules,
  UiModules,
  D3Modules,
  RCModules,
  VideoJSModules
);

const ReactBundleTest = new RegExp(`[\\/]node_modules[\\/](${ReactModules.join('|')})[\\/]`);
const UiBundleTest = new RegExp(`[\\/]node_modules[\\/](${UiModules.join('|')})[\\/]`);
const D3BundleTest = new RegExp(`[\\/]node_modules[\\/](${D3Modules.join('|')})[\\/]`);
const RCBundleTest = new RegExp(`[\\/]node_modules[\\/](${RCModules.join('|')})[\\/]`);
const VideoJSBundleTest = new RegExp(`[\\/]node_modules[\\/](${VideoJSModules.join('|')})[\\/]`);
const VendorBundleTest = new RegExp(`[\\/]node_modules[\\/](?!${RemovedModules.join('|')})`);

module.exports = (() => ({
  react: {
    test: ReactBundleTest,
    chunks: 'initial',
    name: 'react',
    enforce: true
  },
  ui: {
    test: UiBundleTest,
    chunks: 'initial',
    name: 'ui',
    enforce: true
  },
  d3: {
    test: D3BundleTest,
    chunks: 'initial',
    name: 'd3',
    enforce: true
  },
  rc: {
    test: RCBundleTest,
    chunks: 'initial',
    name: 'rc',
    enforce: true
  },
  videoJs: {
    test: VideoJSBundleTest,
    chunks: 'initial',
    name: 'videojs',
    enforce: true
  },
  vendor: {
    test: VendorBundleTest,
    chunks: 'initial',
    name: 'vendor',
    enforce: true
  }
}))();
