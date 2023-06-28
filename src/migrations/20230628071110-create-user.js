'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};