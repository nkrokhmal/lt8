const path = require('path');
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./config/webpack.dev');

const app = express();
const compiler = webpack(webpackConfig);
const DEFAULT_PORT = 3000;

// ----------------------------------------------------------------------------
// Hot reload middlewares

app.use(devMiddleware(compiler, {
  stats: webpackConfig.stats,
  publicPath: webpackConfig.output.publicPath
}));

app.use(hotMiddleware(compiler));

// ----------------------------------------------------------------------------
// Static files

app.use('/img', express.static(path.join(__dirname, './img')));

// ----------------------------------------------------------------------------
// Root

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// ----------------------------------------------------------------------------

app.listen(DEFAULT_PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Listen on http://localhost:${DEFAULT_PORT}/`);
  }
});
