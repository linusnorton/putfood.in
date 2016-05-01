const bcrypt = require('bcrypt-as-promised');

export default class Hash {

  /**
   * Generate a hash from the given password
   *
   * @param  {string}          password
   * @return {Promise<string>}
   */
  static generate(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Compare the given password against a stored hash
   *
   * @param  {string}           password
   * @param  {string}           hash
   * @return {Promise<boolean>}
   */
  static async compare(password: string, hash: string): Promise<boolean> {
    try {
      await bcrypt.compare(password, hash);

      return true;
    }
    catch (e) {
      return false;
    }
  }
}
