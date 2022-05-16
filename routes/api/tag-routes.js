const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  
  Tag.findAll({
    include: [{ model: Product, through: ProductTag, as: "products" }],
    order: [
      ["tag_name", "ASC"]
    ]
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
      include: [{ model: Product, thought: ProductTag, as: "products" }]
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
 
  Tag.update(req.body, {
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

module.exports = router;
