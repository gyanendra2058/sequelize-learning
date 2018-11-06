'use strict';
const bcrypt = require('bcrypt');
const _ = require('lodash');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        username: {
            type: Sequelize.STRING,
            unique: 'compositeIndex'
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
        firstName: Sequelize.TEXT,
        lastName: Sequelize.TEXT
    });

    User.beforeCreate((user, options) => {
        if (_.isNil(user.username)) {
            user.username = user.email;
        }
        return bcrypt.hash(user.password, 10).
        then(hashedPassword => {
            user.password = hashedPassword;
        });
    });

    User.prototype.isValidPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    }

    return User;
};