import LoginCommand from '../model/auth/LoginCommand';
import UserNotFoundException from '../model/user/UserNotFoundException';

export default class AuthController {

  /**
   * POST /auth
   * 
   * @param {any} ctx
   * @param {any} next
   */
  static async post(ctx: any, next: () => any) {
    const [authRepo, userRepo] = await Promise.all([
      ctx.app.di.get('auth.repository'),
      ctx.app.di.get('user.repository')
    ]);
    
    const login = new LoginCommand(authRepo, userRepo);
    
    try {
      const token = await login.run(ctx.request.body.email, ctx.request.body.password);
      ctx.response.status = 201;
      ctx.response.body = { token: token };
    }
    catch (e) {
      if (e instanceof UserNotFoundException) {
        ctx.response.status = 400;
        ctx.response.body = { error: "Cannot find a user with that email" };      
      }
      else {
        ctx.response.status = 401;
        ctx.response.body = { error: "Cannot find a user with that email and password" };
      }
    }
  }
}
