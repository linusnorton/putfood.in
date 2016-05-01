
import UserRepository from '../model/user/UserRepository';
import CreateUserCommand from '../model/user/CreateUserCommand';
import UserAlreadyExistsException from '../model/user/UserAlreadyExistsException';
import AuthRepository from '../model/auth/AuthRepository';
import Hash from '../model/auth/Hash';

export default class UserController {

  /**
   * GET /user/:email
   *
   * @param  {any}      ctx
   * @param  {Function} next
   * @return {void}
   */
  static async get(ctx: any, next: () => any) {
    const repository: UserRepository = await ctx.app.context.di.get('user.repository');
    const user = await repository.getUser(ctx.params.email);

    if (user === null) {
      ctx.response.status = 404;
      ctx.body = { error: "User not found" };
    }
    else {
      ctx.body = user;
    }
  }

  /**
   * POST /user/
   *
   * @param  {any}      ctx
   * @param  {Function} next
   * @return {void}
   */
  static async post(ctx: any, next: () => any) {
    const cmd: CreateUserCommand = await ctx.app.context.di.get('user.createUserCommand');

    try {
      await cmd.run(ctx.request.body.email, ctx.request.body.name)
      ctx.response.status = 201;
    }
    catch (e) {
      console.log(e);

      if (e instanceof UserAlreadyExistsException) {
        ctx.response.status = 400;
        ctx.body = { error: "User already exists" };
      }
      else {
        ctx.response.status = 500;
        ctx.body = { error: "Internal server error" };
      }
    }

  }

  /**
   * PUT /user/:email
   *
   * @param  {any}      ctx
   * @param  {Function} next
   * @return {void}
   */
  static async put(ctx: any, next: () => any) {
    const authRepo: AuthRepository = await ctx.app.context.di.get('auth.repository');
    const token = ctx.request.header['x-auth-token'];
    const email = ctx.params.email;

    if (await authRepo.isTokenValid(token, email)) {
      const userRepo: UserRepository = await ctx.app.context.di.get('user.repository');
      let update: any = {};

      if (ctx.request.body.password) {
        update.password = await Hash.generate(ctx.request.body.password);
      }

      if (ctx.request.body.name) {
        update.name = ctx.request.body.name;
      }

      userRepo.updateUser(ctx.params.email, update);
      ctx.response.status = 200;
    }
    else {
      ctx.response.status = 401;
      ctx.body = { error: "Invalid token" };
    }
  }

}
