'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      fullname: "Admin Admin",
      email: "admin@admin.com",
      password: "admin182529",
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
