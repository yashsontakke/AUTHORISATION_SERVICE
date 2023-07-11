const { User , Role} = require('../models/index'); // Assuming you have a User model defined

class UserRepository {
   async createUser({email, password}){
    try {
      const user = await User.create( {email, password} );
      return user;
    } catch (error) {
      throw new Error('Failed to create user.');
    }
  }

   async deleteUser(userId) {
    try {
      const deletedUserCount = await User.destroy({ where: { id: userId } });
      return deletedUserCount;
    } catch (error) {
      throw new Error('Failed to delete user.');
    }
  }
  async getUserById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['id', 'email'], // Specify the columns you want to retrieve
      });
  
      return user;
    } catch (error) {
      throw new Error(`Failed to get user by id: ${error.message}`);
    }
  }
  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where:{email:userEmail}
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to get user by emailId: ${error.message}`);
    }
  }
  async isAdmin(userId) {
    try {
        const user = await User.findByPk(userId);
        const adminRole = await Role.findOne({
            where: {
                name: 'ADMIN'
            }
        });
        console.log(adminRole);
        return user.hasRole(adminRole);
    } catch (error) {
        console.log("Something went wrong on repository layer");
        throw error;
    }
}
}

module.exports = UserRepository;
