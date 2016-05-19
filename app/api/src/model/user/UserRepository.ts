
class User {
  email: string;
  password: string;
}

export default class UserRepository {

  database: any;

  constructor(database) {
    this.database = database;
  }

  /**
   * Look up a user by email address
   *
   * @param  {string} email
   * @return {Promise<User>}
   */
  async getUser(email: string): Promise<User> {
      const user = await this.database.query("SELECT * FROM user WHERE email = ?", [email]);

      return user.length !== 0 ? user : null;
  }

  /**
   * Insert a user into the database
   *
   * @param  {string}        email
   * @param  {string}        name
   * @return {Promise<void>}
   */
  async createUser(email: string, name: string = null): Promise<void> {
    return this.database.query("INSERT INTO user SET ?", {
      email: email,
      name: name
    });
  }

  /**
   * Update a user
   *
   * @param  {string}        email
   * @param  {Object}        user
   * @return {Promise<void>}
   */
  async updateUser(email: string, user: Object): Promise<void> {
    return this.database.query("UPDATE user SET ? WHERE email = ?", [user, email]);
  }


}
