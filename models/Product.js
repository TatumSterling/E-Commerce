const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}


Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stock: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      default: 10,
      Validate: {
        isInt: {
          msg: 'Please enter a valid number'
        }
      }

    },
    category_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'category',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
