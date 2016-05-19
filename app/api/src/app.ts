import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import routes from '../config/routes';
import DependencyContainer from './model/util/DependencyContainer';
import crons from '../config/crons';

const scheduler = require('node-schedule');
const app = new Koa();
const router = new Router();

app.context.di = new DependencyContainer();

console.log("\n##############\n# putfood.in #\n##############\n");
console.log("Crons:\n");

for (const cron of crons) {
  console.log(`  ${cron.getName()}: ${cron.getSchedule()}`);
  scheduler.scheduleJob(cron.getSchedule(), _ => cron.execute(app.context.di));
}

console.log("\nRoutes:\n");

for (const uri in routes) {
  const methods = Object.keys(routes[uri]).join(', ').toUpperCase();
  console.log(`  ${uri} (${methods})`);
  
  for (const method in routes[uri]) {
    router[method.toLowerCase()](uri, routes[uri][method]);
  }
}

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
;

console.log(`\nAPI running on port: ${process.env.API_PORT}`);
app.listen(process.env.API_PORT);
