const UserRepository = require('../repository/UserRepository');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../config/serverConfig");
const bcrypt = require('bcrypt');

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
  async  createToken(user) {
    try {
      const token = jwt.sign(user, SECRET_KEY);
      return token;
    } catch (error) {
      throw new Error(`Failed to create token: ${error.message}`);
    }
  }
  
  async  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded;
    } catch (error) {
      throw new Error(`Failed to verify token: ${error.message}`);
    }
  }
  async comparePasswords(plainPassword, hashedPassword) {
    try {
      const match = bcrypt.compareSync(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      throw new Error(`Failed to compare passwords: ${error.message}`);
    }
  }
}

module.exports = UserService;
