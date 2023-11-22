const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags

router.get('/', async(req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try{
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product}]
  });

  if (!tagData) {
    res.status(404).json({message: 'No tag found with that ID'});
    return; 
  }
  res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data 
});

router.post('/', (req, res) => {
  Tag.create(req.body)
}).then((tag) => {
    res.status(200).json(tag)
  
  // create a new tag
}).catch((err) => {
  res.status(400).json(err)
});

router.put('/:id', (req, res) => {
  // Update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      // Find the updated tag by its primary key (id)
      return Tag.findByPk(req.params.id);
    })
    .then((tag) => {
      // Send the updated tag as the response
      res.json(tag);
    })
    .catch((err) => {
      // Handle errors
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Delete a tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCount) => {
      if (deletedCount > 0) {
        // Records were deleted
        res.json({ message: 'Tag deleted successfully' });
      } else {
        // No records were deleted (tag with the specified ID not found)
        res.status(404).json({ message: 'Tag not found' });
      }
    })
    .catch((err) => {
      // Handle errors
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
