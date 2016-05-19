export default class HouseController {
  
  /**
   * POST /house
   * 
   * @param  {any}      ctx
   * @param  {Function} next
   * @return {void}
   */
  static async post(ctx: any, next: () => any) {
    const [votingRepo, authRepo] = await Promise.all([
      ctx.app.context.di.get('voting.repository'),
      ctx.app.context.di.get('auth.repository')
    ]); 

    const owner = ctx.request.body.owner;
    const name = ctx.request.body.name;
    const token = ctx.request.header['x-auth-token'];
console.log(token, owner);
    if (await authRepo.isTokenValid(token, owner) === false) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid access token" };      
    }
    else if (!owner || !name) {
      ctx.response.status = 400;
      ctx.response.body = { error: "A house must have an owner and a name" };
    }
    else {
      try {
        await votingRepo.createHouse(name, owner);
        ctx.response.status = 201;
      }
      catch (e) {
        ctx.response.status = 500;
        ctx.response.body = { error: e };        
      }
    }    
  }
}