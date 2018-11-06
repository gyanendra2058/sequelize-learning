'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: 'compositeIndex',
                validate: {isEmail: true}
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            firstName: {
                type: Sequelize.TEXT
            },
            lastName: {
                type: Sequelize.TEXT
            },
            username: {
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
        }).then((result) => {
            queryInterface.addConstraint('Users', ['email, username'], {
            type: 'unique',
            name: 'uk_username_email'
          });
        }).catch((err) => {          
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};