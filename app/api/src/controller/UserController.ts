import { IRouterContext } from "koa-router";
import UserService from '../model/UserService';

export default class UserController {

  static async get(ctx: IRouterContext, next: () => any) {
    const userService: UserService = await ctx.app.context.di.get('userService');

    ctx.body = await userService.getUser(ctx.params.email);
  }

}
