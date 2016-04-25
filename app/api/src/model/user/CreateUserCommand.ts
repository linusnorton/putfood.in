
import * as uuid from "node-uuid";
import UserRepository from './UserRepository';
import EmailService from '../email/EmailService';
import UserAlreadyExistsException from './UserAlreadyExistsException';

export default class CreateUserCommand {

  database: any;
  emailer: EmailService;
  repository: UserRepository;

  constructor(database, repository: UserRepository, emailer: EmailService) {
    this.database = database;
    this.repository = repository;
    this.emailer = emailer;
  }

  async run(email: string, name: string): Promise<void> {
    if (null !== await this.repository.getUser(email)) {
      throw new UserAlreadyExistsException();
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
