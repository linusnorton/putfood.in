
import UserRepository from './UserRepository';
import EmailService from '../email/EmailService';
import UserAlreadyExistsException from './UserAlreadyExistsException';
import AuthRepository from '../auth/AuthRepository';
import RegistrationEmail from './RegistrationEmail';

export default class CreateUserCommand {

  database: any;
  emailer: EmailService;
  userRepo: UserRepository;
  authRepo: AuthRepository;

  constructor(database, userRepo: UserRepository, authRepo: AuthRepository, emailer: EmailService) {
    this.database = database;
    this.userRepo = userRepo;
    this.authRepo = authRepo;
    this.emailer = emailer;
  }

  /**
   * Check the user doesn't already exist and then sign them up, generating
   * an authentication token and registration email in the process.
   *
   * @param  {string}        email
   * @param  {string}        name
   * @return {Promise<void>}
   */
  async run(email: string, name: string): Promise<void> {
    if (null !== await this.userRepo.getUser(email)) {
      throw new UserAlreadyExistsException();
    }

    this.userRepo.createUser(email, name);
    const key = this.authRepo.createToken(email);

    this.emailer.send(email, new RegistrationEmail(name, key));
  }

}
