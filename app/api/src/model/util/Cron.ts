import DependencyContainer from './DependencyContainer';

interface Cron {

  /**
   * Name of the job
   *
   * @return {string}
   */
  getName(): string;

  /**
   * Schedule string e.g. 5 * * * *
   * @return {string}
   */
  getSchedule(): string;

  /**
   * Execute the job
   *
   * @param  {DependencyContainer} di
   * @return {any}
   */
  execute(di: DependencyContainer): any;

}

export default Cron;
 