
import Cron from '../util/Cron';
import DependencyContainer from '../util/DependencyContainer';

export default class Election implements Cron {

  /**
   * @return {string}
   */
  getName(): string {
    return "Election";
  }

  /**
   * @return {string}
   */
  getSchedule(): string {
    return "11 */1 * * * *";
  }

  /**
   * Send out a list of meal suggestions to each house
   *
   * @param  {DependencyContainer} di
   * @return {Promise<void>}
   */
  async execute(di: DependencyContainer): Promise<void> {
    const [repo, emailer] = await Promise.all([
      di.get('voting.repository'),
      di.get('email.service'),
    ]);

    for (const house of await repo.getHouses()) {
      const [election, members, recipes] = await Promise.all([
        repo.addElection(house.id),
        repo.getHouseMembers(house.id),
        repo.getHouseRecipes
      ]);
      
      emailer.election(members, recipes, election.id);
    }
  }
}
