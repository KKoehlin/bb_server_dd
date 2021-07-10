const Sequelize = require('sequelize')

const sequelize = new Sequelize("postgres://postgres:Choir92!@localhost:5432/bbproject")

module.exports = sequelize