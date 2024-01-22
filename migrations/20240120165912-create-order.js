'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull:false,
        reference:{
          key:"id",
          model:'Users'
        },
      },
      productid: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull:false,
        reference:{
          key:'id',
          model:'Product'
        }
      },
      quantity: {
        allowNull:false,
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      totalPrice: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Orders');
  }
};