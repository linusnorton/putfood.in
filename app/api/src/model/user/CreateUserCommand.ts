
import UserRepository from './UserRepository';
import EmailService from '../email/EmailService';
import UserAlreadyExistsException from './UserAlreadyExistsException';
import AuthRepository from '../auth/AuthRepository';

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

  async run(email: string, name: string): Promise<void> {
    if (null !== await this.userRepo.getUser(email)) {
      throw new UserAlreadyExistsException();
    }

    this.userRepo.createUser(email, name);
    const key = this.authRepo.createToken(email);

    this.emailer.registration(email, {
      name: name,
      key: key
    });
  }

}
