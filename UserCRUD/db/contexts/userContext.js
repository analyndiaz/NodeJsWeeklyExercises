const DatabaseContext = require("../dbContext");

const USER_COLLECTION = "users";

class UserContext extends DatabaseContext {
  constructor() {
    super(USER_COLLECTION);
  }

  async getUserByUserName(userName) {
    return await this.getByAny("userName", userName);
  }

  async getUserByEmail(emailAddress) {
    return await this.getByAny("emailAddress", emailAddress);
  }

  async updateByUserName(userName, data = {}) {
    return await this.update({ ["userName"]: userName }, data);
  }

  async deleteByUserName(userName, data = {}) {
    return await this.delete({ ["userName"]: userName }, data);
  }
}

module.exports = new UserContext();
