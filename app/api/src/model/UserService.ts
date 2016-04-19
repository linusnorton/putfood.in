
export default class UserService {

  database: any;

  constructor(database) {
    this.database = database;
  }

  getUser(email: string) {
    return this.database.query("SELECT * FROM user WHERE email = ?", email);
  }

}
