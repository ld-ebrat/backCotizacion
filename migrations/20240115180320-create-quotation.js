'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quotations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId:{
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id"
        }
      },
      ClientId:{
        type: Sequelize.UUID,
        references: {
          model: "Clients",
          key: "id"
        }
      },
      subTotal:{
        type: Sequelize.INTEGER
      },
      total:{
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Quotations');
  }
};