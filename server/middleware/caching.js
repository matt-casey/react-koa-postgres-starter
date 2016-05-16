import compose from 'koa-compose';
import convert from 'koa-convert';
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import favicon from 'koa-favicon';
import compress from 'koa-compress';
import cors from 'koa-cors';

export default () => compose([
  convert(cors()),
  favicon(),
  conditional(),
  etag(),
  compress(),
]);
