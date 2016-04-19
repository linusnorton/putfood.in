import * as Koa from 'koa';
import * as Router from 'koa-router';
import routes from '../config/routes';
import DependencyInjection from '../config/dependencies';

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

app.context.di = new DependencyInjection();

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log(`\nPort: ${process.env.API_PORT}`);
app.listen(process.env.API_PORT);
