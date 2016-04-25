
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

  static async put(ctx: any, next: () => any) {
    ctx.body = "todo";
  }

}
