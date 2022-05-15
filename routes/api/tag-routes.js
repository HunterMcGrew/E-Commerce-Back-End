const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: "Product" }],
    order: [
      ["tag_name", "ASC"]
    ]
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: "No tags available."});
      return;
    }
  })
  .then((tagData) => {
    res.status(200).json(tagData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

 // find a single tag by its `id`
router.get('/:id', (req, res) => {
 
    Tag.findByPk(req.params.id, {
      include: [{ model: Product, thought: ProductTag, as: "Product" }]
    })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No tag with this id exists."});
        return;
      }
    })
    .then((tagData) => {
      res.status(200).json(tagData);
    })
    .catch((err) => {
      if (err) throw err;
    })
});

 // create a new tag
router.post('/', (req, res) => {
 
  Tag.create(req.body)
  .then((tagData) => {
    res.status(200).json(tagData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

 // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
 
  Tag.update({
    where: {
      id: req.params.id
    }
  })
  .then((tagData) => {
    res.status(200).json(tagData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {

  Tag.destroy({
    where: {
      id: req.body.id
    }
  })
  .then((tagData) => {
    if (!tagData) {
      res.status(404).json({ message: "No tag with this id exists."});
    }
  })
  .then((tagData) => {
    res.status(200).json(tagData);
  })
  .catch((err) => {
    if (err) throw err;
  })
});

module.exports = router;
