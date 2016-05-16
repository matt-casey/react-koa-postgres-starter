import path from 'path';
import webpack from 'webpack';
import express from 'express';
import config from '../webpack.dev.config';

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  progress: true,
  stats: {
    colors: true,
    chunks: false,
    hash: false,
    modules: false,
    version: false,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(8000, err => {
  if (err) return console.error(err);

  console.log('React app running at http://localhost:8000/');
});
