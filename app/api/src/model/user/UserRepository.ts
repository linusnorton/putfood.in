
import * as uuid from "node-uuid";

export default class UserRepository {

  database: any;

  constructor(database) {
    this.database = database;
  }

  /**
   * Look up a user by email address
   *
   * @param  {string} email
   * @return {Promise<Object>}
   */
  async getUser(email: string): Promise<Object> {
    try {
      return await this.database.query("SELECT * FROM user WHERE email = ?", [email]);
    }
    catch (e) {
      console.log(e);

      return null;
    }
  }

}
