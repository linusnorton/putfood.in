
import UserRepository from './UserRepository';
import EmailService from '../email/EmailService';
import AuthRepository from '../auth/AuthRepository';
import VotingRepository from '../voting/VotingRepository';
import InvitationEmail from './InvitationEmail';
import AddedToHouseEmail from './AddedToHouseEmail';

export default class CreateUserCommand {

  database: any;
  emailer: EmailService;
  userRepo: UserRepository;
  authRepo: AuthRepository;
  votingRepo: VotingRepository;

  constructor(database, userRepo: UserRepository, authRepo: AuthRepository, votingRepo: VotingRepository, emailer: EmailService) {
    this.database = database;
    this.userRepo = userRepo;
    this.authRepo = authRepo;
    this.votingRepo = votingRepo;
    this.emailer = emailer;
  }

  /**
   * Check the user doesn't already exist and then sign them up, generating
   * an authentication token and registration email in the process.
   * 
   * If the user already exists add them to the house and send them an email
   *
   * @param  {string} email
   * @param  {any} house
   * @param  {any} from          
   * @return {Promise<void>}
   */
  async run(email: string, house: any, from: any): Promise<void> {
    const user = await this.userRepo.getUser(email);
    if (user) {
      this.votingRepo.addMemberToHouse(house.id, email);      
      this.emailer.send(email, new AddedToHouseEmail(user, from, house));
    }
    else {
      this.userRepo.createUser(email);
      this.votingRepo.addMemberToHouse(house.id, email);      
      const key = this.authRepo.createToken(email);

      this.emailer.send(email, new InvitationEmail(from, key, house));      
    }
  }

}
