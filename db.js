const Sequelize = require('sequelize');


const sequelize = new Sequelize("postgres://postgres:e686d4f3c5244ad29b9b85bade74b879@localhost:5432/bbproject")


module.exports = sequelize