import UserRepository from '../user/UserRepository';
import CreateUserCommand from '../user/CreateUserCommand';
import EmailService from '../email/EmailService';
import AuthRepository from '../auth/AuthRepository';

export default class DependencyContainer {

  deps = {};

  builders = {
    "database": async function() {
      const db = require('promise-mysql');
      const connection = await db.createPool({
        host: process.env.DATABASE_HOSTNAME,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: "putfood",
        connectionLimit: 10
      });

      return connection;
    },

    "user.repository": async () => {
      const connection = await this.get("database");

      return new UserRepository(connection);
    },

    "user.createUserCommand": async () => {
      const [db, userRepo, authRepo, emailer] = await Promise.all([
        this.get("database"),
        this.get("user.repository"),
        this.get("auth.repository"),
        this.get("email.service")
      ]);

      return new CreateUserCommand(db, userRepo, authRepo, emailer);
    },

    "email.service": async () => {
      return new EmailService();
    },

    "auth.repository": async () => {
      const connection = await this.get("database");

      return new AuthRepository(connection);
    },

  };

  /**
   * Check the deps object to see if the requested dependency has already been
   * instantiated. If not create it using the factory method in the builder object
   * and then return it.
   *
   * @param  {string} name
   * @return {any}
   */
  get(name: string): any {
    if (typeof this.deps[name] == 'undefined') {
      if (typeof this.builders[name] != 'function') {
        throw new Error(`Unknown dependency ${name}`);
      }

      this.deps[name] = this.builders[name].call(this, arguments);
    }

    return this.deps[name];
  }

}
