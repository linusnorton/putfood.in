import { IRouterContext } from "koa-router";

export default class UserController {

  static get(ctx: IRouterContext, next: () => any) {
    ctx.body = {};
  }

}
