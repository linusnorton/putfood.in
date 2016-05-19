import Email from '../email/Email';

export default class AddedToHouseEmail implements Email {

  user: any;
  from: any;
  house: any;

  constructor(user: any, from: any, house: any) {
    this.user = user;
    this.from = from;
    this.house = house;
  }

  getSubject(): string {
    return "You have been added to a house";
  }

  getHTML(): string {
    return `Hi ${this.user.name},

    ${this.from.name} has invited you to join ${this.house.name} to organise your meals. 
    
    Thanks!`;
  }

}
