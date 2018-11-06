'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      title: {
        type: Sequelize.STRING
      },

      author: {
        type: Sequelize.STRING
      },

      releaseDate: {
        type: Sequelize.STRING
      },

      price: {
        type: Sequelize.INTEGER
      },

      publication: {
        type: Sequelize.STRING
      },

      coverColor: {
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
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};