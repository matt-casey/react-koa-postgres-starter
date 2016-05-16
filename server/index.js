import 'babel-polyfill';
import Koa from 'koa';
import mount from 'koa-mount';

import { headers, devLogging, errorHandling, staticContent } from './middleware';
import routes from './routes';

const app = new Koa();

app.use(errorHandling());
app.use(devLogging());
app.use(headers());
app.use(mount('/api', routes()));
if (app.env === 'development') {
  console.log('running in dev');
  require('./express-hmr-server');
} else {
  console.log('running in prod');
  console.log('React app running at http://localhost:8080/');
  app.use(staticContent());
}

app.listen(8080);
console.log('Api running at http://localhost:8080/api/');

export default app;
