const UserRepository = require('../repository/UserRepository');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    

    try {
      // Perform any additional business logic or validation here before calling the repository method
      const newUser = await this.userRepository.createUser(data);
      // Perform any additional operations or return relevant data as needed
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }

  async deleteUser(userId) {
    try {
      // Perform any additional business logic or validation here before calling the repository method
      const deletedUserCount = await this.userRepository.deleteUser(userId);
      // Perform any additional operations or return relevant data as needed
      return deletedUserCount;
    } catch (error) {
      throw new Error('Failed to delete user.');
    }
  }
}

module.exports = UserService;
