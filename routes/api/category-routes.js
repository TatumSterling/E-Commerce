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

router.post('/', async (req, res) => {
  const catData = await Category.create(req.body);

  return res.json(catData);
});

router.put('/:id', async(req, res) => {
  const catData = await Category.update(
    { name: req.body.name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  return res.json(catData)

});

router.delete('/:id', async(req, res) => {
  const catData = await Category.destroy(
    {
      where: {
        id: req.params.id
      },
    }
  )
  return res.json(catData);
});

module.exports = router;
