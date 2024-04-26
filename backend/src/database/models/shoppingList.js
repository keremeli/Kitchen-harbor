
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ShoppingList = sequelize.define(
    'ShoppingList',
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
          ingredients: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
          },
          completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
    }, 
    {
        timestamps: false, // Disable timestamps
    }

);

module.exports = ShoppingList;
