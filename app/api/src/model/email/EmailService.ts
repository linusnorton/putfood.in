import Email from './Email';

interface MailTransport {
  sendMail(opts: Object);
}

type Recipients = string[] | string;

export default class EmailService {

  transport: MailTransport;

  from: string;

  constructor(transport: MailTransport, from: string) {
    this.transport = transport;
    this.from = from;
  }

  /**
   * @param  {Recipients}    to
   * @param  {Email}         email
   * @return {Promise<void>}
   */
  send(to: Recipients, email: Email): Promise<void> {
    return this.transport.sendMail({
      to: to,
      from: this.from,
      subject: email.getSubject(),
      html: email.getHTML()
    });
  }    

  /**
   * Send an email for the voting
   *
   * @param  {string[]} members
   * @param  {string[]} recipes
   * @param  {number}   electionId
   * @return {Promise<void>}
   */
  election(members: string[], recipes: string[], electionId: number): Promise<void> {
    return this.transport.sendMail({
      to: members,
      from: this.from,
      subject: "Meal suggestions",
      html: "Please vote: " + recipes.join(', ')
    });
  }

}
