const { DataTypes } = require("sequelize");
const db = require("../db");

const Character = db.define('character', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique: true,
    },
    race: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alignment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trait: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Character;