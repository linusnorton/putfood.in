
import UserRepository from '../user/UserRepository';
import AuthRepository from './AuthRepository';
import UserNotFoundException from './UserNotFoundException';
import IncorrectPasswordException from './IncorrectPasswordException';
import Hash from './Hash';

export default class LoginCommand {

  userRepository: UserRepository;
  authRepository: AuthRepository;

  constructor(userRepository: UserRepository, authRepository: AuthRepository) {
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  /**
   * Validate the users password and create them an authentication token
   *
   * @param  {string}        email    [description]
   * @param  {string}        password [description]
   * @return {Promise<void>}          [description]
   */
  async run(email: string, password: string): Promise<Object> {
    const user = await this.userRepository.getUser(email);

    if (user === null) {
      throw new UserNotFoundException();
    }

    if (await Hash.compare(password, user.password)) {
      throw new IncorrectPasswordException();
    }

    return this.authRepository.createToken(email)
  }
}
