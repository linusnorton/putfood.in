import * as Koa from 'koa';
import * as Router from 'koa-router';
import routes from '../config/routes';
import DependencyContainer from './model/dependency/DependencyContainer';

const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

console.log("\n##############\n# putfood.in #\n##############\n");
console.log("Routes:\n");

for (let uri in routes) {
  for (let method in routes[uri]) {
    console.log(`  ${method.toUpperCase()} ${uri}`);
    router[method.toLowerCase()](uri, routes[uri][method]);
  }
}

app.context.di = new DependencyContainer();

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
;

console.log(`\nPort: ${process.env.API_PORT}`);
app.listen(process.env.API_PORT);
