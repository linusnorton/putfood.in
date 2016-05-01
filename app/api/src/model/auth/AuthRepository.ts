import * as uuid from "node-uuid";

export default class AuthRepository {

  database: any;

  constructor(database) {
    this.database = database;
  }

  /**
   * Check if a given token is valid or not.
   *
   * @param  {string} token
   * @param  {string} user
   * @return {Promise<boolean>}
   */
  async isTokenValid(token: string, user: string): Promise<boolean> {
    const result = await this.database.query(
      "SELECT * FROM user_authentication WHERE token = ? AND user = ? AND expiry > NOW()",
      [token, user]
    );

    return result.length !== 0;
  }

  /**
   * Remove a token
   *
   * @param  {string} token
   * @return {Promise<void>}
   */
  async destroyToken(token: string): Promise<void> {
    return this.database.query(
      "DELETE FROM user_authentication WHERE token = ?",
      [token]
    );
  }

  /**
   * Create a token
   *
   * @param  {string} user
   * @return {string}
   */
  createToken(user: string, duration: number = 99999999): string {
    const key = uuid.v4();
    const expiry = Date.now() + duration;
    
    this.database.query("INSERT INTO user_authentication SET ?", {
      user: user,
      token: key,
      expiry: expiry
    });

    return key;
  }


}
