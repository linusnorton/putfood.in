import Email from '../email/Email';

export default class RegistrationEmail implements Email {

  name: string;
  key: string;

  constructor(name: string, key: string) {
    this.name = name;
    this.key = key;
  }

  getSubject(): string {
    return "Welcome to putfood";
  }

  getHTML(): string {
    return `Hello ${this.name},\nThank you for verifying your email. Please <a href="something/${this.key}"> complete your registration`;
  }

}
