'use strict';
module.exports = (sequelize, Sequelize) => {
  var Book = sequelize.define('Book', {
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    releaseDate: Sequelize.STRING,
    price: Sequelize.INTEGER,
		publication: Sequelize.STRING,
		cover: Sequelize.STRING
  });
  
  return Book;
};
