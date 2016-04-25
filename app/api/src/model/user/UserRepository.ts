
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
      const user = await this.database.query("SELECT * FROM user WHERE email = ?", [email]);

      return user.length !== 0 ? user : null;
  }

}
