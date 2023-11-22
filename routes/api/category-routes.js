const router = require('express').Router();
const { Category, Product } = require('../../models');


router.get('/', async (req, res) => {
  const catData = await Category.findAll();
  
  return res.json(catData);
});

router.get('/:id', async(req, res) => {
  const catData = await Category.findByPk(req.params.id);

  return res.json(catData);
  
});

router.post('/',  (req, res) => {
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
;
});

router.put('/:id',(req, res) => {
  Category.update( 
    { category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(() => {
    // Find the updated tag by its primary key (id)
    return Category.findByPk(req.params.id);
  })
  .then((catData) => {
    // Send the updated tag as the response
    res.json(catData);
  })
  .catch((err) => {
    // Handle errors
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Category.destroy(
    {
      where: {
        id: req.params.id
      },
    })    
    .then((deleted) => {
    
      // Records were deleted
      return res.json(deleted)
    })
    .catch((err) => {
      // Handle errors
      res.status(500).json(err);
    });
  });

      // No records were deleted (tag with the specified ID not found)
    


module.exports = router;
