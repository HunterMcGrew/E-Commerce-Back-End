// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Associations 
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE"
});

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    foreignKey: "product_id"
  }
});

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    foreignKey: "tag_id"
  }
});

// exports
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
