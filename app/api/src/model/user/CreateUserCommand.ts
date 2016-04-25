
import * as uuid from "node-uuid";
import UserRepository from './UserRepository';
import EmailService from '../email/EmailService';

export default class CreateUserCommand {

  database: any;
  emailer: EmailService;
  repository: UserRepository;

  constructor(database, emailer, repository) {
    this.database = database;
    this.emailer = emailer;
    this.repository = repository;
  }

  async run(email: string, name: string): Promise<void> {
    if (await this.repository.getUser(email)) {
      throw new Error("User already exists");
    }

    const key = uuid.v4();

    this.database.query("INSERT INTO user SET ?", {
      email: email,
      name: name,
      key: key
    });

    this.emailer.send(email, "Welcome", `Your key is ${key}`);
  }

}
