import compose from 'koa-compose';
import convert from 'koa-convert';
import serve from 'koa-static';
import fallback from 'koa-history-api-fallback';
import path from 'path';

const root = path.join(__dirname, '../../build');

export default () => compose([
  convert(fallback()),
  serve(root),
]);
