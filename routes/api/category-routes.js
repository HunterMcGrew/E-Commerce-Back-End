const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  const categoryData = await Category.findAll( {
    // include products associated with the Categories
    include: [{ model: Product, as: "products" }],
    order: [
      ["category_name", "ASC"]
    ]
  });

  if (!categoryData) {
    res.status(404).json({ message: "No categories found!" });
    return;
  }

  res.status(200).json(categoryData);
  } catch (err) {
    if (err) throw err;
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: "products" }],
      order: [
        ["category_name", "ASC"]
      ],
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category with that id found!"});
      return;
    }

    res.status(200).json(categoryData);

  } catch (err) {
    if (err) throw err;
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);

    res.status(200).json(categoryData);

  } catch (err) {
    if (err) throw err;
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id);

    res.status(200).json(categoryData);

  } catch (err) {
    if (err) throw err;
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category with this id found!" });
    }

    res.status(200).json(categoryData);

  } catch (err) {
    if (err) throw err;
  }
});

module.exports = router;
