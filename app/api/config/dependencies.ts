import * as Router from 'koa-router';
import UserService from '../src/model/UserService';


export default class DependencyInjection {

  deps = {};

  static builders = {
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

    "userService": async function(): Promise<UserService> {
      const connection = await this.get("database");

      return new UserService(connection);
    }

  };

  get(name: string): any {
    if (typeof this.deps[name] == 'undefined') {
      if (typeof DependencyInjection.builders[name] != 'function') {
        throw new Error(`Unknown dependency ${name}`);
      }

      this.deps[name] = DependencyInjection.builders[name].call(this, arguments);
    }

    return this.deps[name];
  }

}
