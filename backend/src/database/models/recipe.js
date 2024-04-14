
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Recipe = sequelize.define(
    'Recipe',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },

);

module.exports = Recipe;
