'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');

const {SALT} = require("../config/serverConfig")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: 'User_Roles'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isLongEnough(value) {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters long.');
          }
        },
        containsUppercase(value) {
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password should contain at least one uppercase letter.');
          }
        },
        containsLowercase(value) {
          if (!/[a-z]/.test(value)) {
            throw new Error('Password should contain at least one lowercase letter.');
          }
        },
        containsNumber(value) {
          if (!/\d/.test(value)) {
            throw new Error('Password should contain at least one number.');
          }
        },
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // Define the 'beforeCreate' hook for the User model
User.beforeCreate(async (user, options) => {
  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the user's password using the generated salt
  const hashedPassword = await bcrypt.hash(user.password, salt);

  // Update the user object with the hashed password
  user.password = hashedPassword;
  
});
  return User;
};