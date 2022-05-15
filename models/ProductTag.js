const { Model, DataTypes } = require('sequelize');
// need Tag and product models
const Tag = require("./Tag");
const Product = require("./Product"); 

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Tag,
        key: "id",
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
