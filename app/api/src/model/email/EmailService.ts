
interface MailTransport {
  sendMail(opts: Object);
}
export default class EmailService {

  transport: MailTransport;

  from: string;

  constructor(transport: MailTransport, from: string) {
    this.transport = transport;
    this.from = from;
  }

  /**
   * Send a registration email
   *
   * @param  {String} to
   * @param  {Object} context
   */
  registration(to: String, context: Object): Promise<void> {
    return this.transport.sendMail({
      to: to,
      from: this.from,
      subject: "Welcome to putfood",
      html: "Content"
    });
  }

}
