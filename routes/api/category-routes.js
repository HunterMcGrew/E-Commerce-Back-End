const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
router.get("/", (req, res) => {

  Category.findAll({
    // include products associated with the Categories
    include: [
      { 
        model: Product, 
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ],
    order: [
      ["category_name", "ASC"]
    ]
  })
  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    if (err) throw err;
  });
});

// find one category by its `id` value
router.get("/:id", (req, res) => {
  
  Category.findByPk(req.params.id, {
    include: [
      { 
        model: Product, 
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ]
    })
    .then((categoryData) => {
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      if (err) throw err;
    })
});

// create a new category
router.post("/", (req, res) => {
  
  Category.create(req.body)
  
  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })

  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

// delete a category by its `id` value
router.delete("/:id", (req, res) => {
  
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((categoryData) => {
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      if (err) throw err;
    })
});

module.exports = router;