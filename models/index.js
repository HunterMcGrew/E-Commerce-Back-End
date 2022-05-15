// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Associations 
Product.belongsTo(Category, {
  foreignKey: "category_id",
  constraints: false
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  constraints: false
});

Product.belongsToMany(Tag, {
  through: ProductTag, 
  foreignKey: "product_id",
  constraints: false
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  constraints: false
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
  constraints: false
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  constraints: false
});

// exports
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
