interface House {
  name: string;
  owner: string;
}

interface HouseMember {
  house: number;
  member: string;
}

interface Recipe {
  name: string;
  description: string;
  instructions: string;
  ingredients: string;
}

export default class VotingRepository {

  db: any;

  constructor(db: any) {
    this.db = db;
  }

  /**
   * @return {Promise<House[]>}
   */
  getHouses(): Promise<House[]> {
    return this.db.query("SELECT * FROM house");
  }

  /**
   * @param {number} id
   * @return {Promise<House>}
   */
  getHouse(id: number): Promise<House> {
    return this.db.query("SELECT * FROM house WHERE id = ?", [id]);
  }
  
  /**
   * @param {string} houseName
   * @param {string} owner
   * @return {Promise<void>}
   */
  async createHouse(houseName: string, owner: string): Promise<void> {
    const result = await this.db.query("INSERT INTO house SET ?", {
      name: houseName,
      owner: owner
    });
    
    return this.addMemberToHouse(result.insertId, owner);
  }

  /**
   * @param {number} houseId
   * @param {string} owner
   * @return {Promise<void>}
   */
  addMemberToHouse(houseId: number, member: string): Promise<void> {
    return this.db.query("INSERT INTO house_member SET ?", {
      house: houseId,
      member: member
    });
  }

  /**
   * @param  {number} houseId
   * @return {Promise<HouseMember[]>}
   */
  getHouseMembers(houseId: number): Promise<HouseMember[]> {
    return this.db.query("SELECT * FROM house_member WHERE house_id = ?", [houseId]).map(hm => hm.member);
  }
  
  /**
   * @param  {number} houseId
   * @param  {string} member
   * @return {Promise<void>}
   */
  removeHouseMemebership(houseId: number, member: string) {
    return this.db.query("SELECT * FROM house_member WHERE house_id = ? AND member = ?", [houseId, member]);
  }

  /**
   * @param  {number} houseId
   * @return {Promise<Recipe[]>}
   */
  getHouseRecipes(houseId: number): Promise<Recipe[]> {
    return this.db.query("SELECT * FROM house_recipe WHERE house_id = ?", [houseId]);
  }

  /**
   * @param  {number} houseId
   * @return {Promise<void>}
   */
  addElection(houseId: number): Promise<void> {
    return this.db.query("INSERT INTO election SET house = ?", [houseId]);
  }

}
