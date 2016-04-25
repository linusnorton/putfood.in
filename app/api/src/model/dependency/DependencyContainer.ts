import UserRepository from '../user/UserRepository';
import CreateUserCommand from '../user/CreateUserCommand';
import EmailService from '../email/EmailService';

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
      //const [db, repo, emailer] = ...
      const args = await Promise.all([this.get("database"), this.get("user.repository"), this.get("email.service")]);

      return new CreateUserCommand(args[0], args[1], args[2]);
    },

    "email.service": async () => {
      return new EmailService();
    },

  };

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
