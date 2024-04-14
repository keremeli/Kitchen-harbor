
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Ingredient = sequelize.define(
    'Ingredient',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },

);

module.exports = Ingredient;
