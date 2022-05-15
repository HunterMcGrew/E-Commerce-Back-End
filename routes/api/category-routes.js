const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll( {
    // include products associated with the Categories
    include: [{ model: Product, as: "products" }],
    order: [
      ["category_name", "ASC"]
    ]
  })
  .then((catergoryData) => {
    if (!categoryData) {
      res.status(404).json({ message: "No categories found!" });
      return;
    }
  })
  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    if (err) throw err;
  });
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
      include: [{ model: Product, as: "products" }],
      order: [
        ["category_name", "ASC"]
      ],
    })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No category with that id found!"});
        return;
      }
    })
    .then((categoryData) => {
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      if (err) throw err;
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  
  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.findByPk(req.params.id)

  .then((catergoryData) => {
    if (!catergoryData) {
      res.status(404).json({ message: "No category with that id found!"});
        return;
    }
  })
  .then((categoryData) => {
    res.status(200).json(categoryData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No category with this id found!" });
        return;
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