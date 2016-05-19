import Email from '../email/Email';

export default class InvitationEmail implements Email {

  from: any;
  key: string;
  house: any;

  constructor(from: any, key: string, house: any) {
    this.from = from;
    this.key = key;
    this.house = house;
  }

  getSubject(): string {
    return "Welcome to putfood";
  }

  getHTML(): string {
    return `Hi,
    ${this.from.name} has invited you to join ${this.house.name} to organise your meals. 
    
    Please <a href="something/${this.key}"> complete your registration.
    
    Thanks!`;
  }

}
