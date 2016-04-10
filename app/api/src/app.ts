import * as Koa from 'koa';

const app = new Koa();

console.log("Starting putfood.in app on port " + process.env.API_PORT);
app.listen(process.env.API_PORT);
