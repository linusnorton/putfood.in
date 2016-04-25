
import UserRepository from '../model/user/UserRepository';
import CreateUserCommand from '../model/user/CreateUserCommand';
import UserAlreadyExistsException from '../model/user/UserAlreadyExistsException';

export default class UserController {

  static async get(ctx: any, next: () => any) {
    const repository: UserRepository = await ctx.app.context.di.get('user.repository');

    ctx.body = await repository.getUser(ctx.params.email);
  }

  static async post(ctx: any, next: () => any) {
    const cmd: CreateUserCommand = await ctx.app.context.di.get('user.createUserCommand');

    try {
      await cmd.run(ctx.request.body.email, ctx.request.body.name)
      ctx.response.code = 201;
    }
    catch (e) {
      console.log(e);

      if (e instanceof UserAlreadyExistsException) {
        ctx.response.code = 403;
      }
      else {
        ctx.response.code = 500;
      }
    }

  }

  static async put(ctx: any, next: () => any) {
    ctx.body = "todo";
  }

}
