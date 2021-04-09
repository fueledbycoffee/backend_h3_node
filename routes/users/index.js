const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      { checkToken } = require('../../tools/jwt');
/**
 * GET - / - Récupérer tous les users
 */
router.get('/', checkToken, async (req, res, next) => {
  const items = await mongoose.model('User').find({});

  res.json(items);
});

/**
 * POST - / - Créer un user
 */
router.post('/', async (req, res, next) => {

  // Dans un veritable projet, on aurait des vérifications d'intégrité de données

  res.json(await mongoose.model('User').create(req.body));
});

/**
 * PUT - /:id - Mettre à jour un user
 */
router.put('/:id', checkToken, async (req, res, next) => {
  res.json(await mongoose.model('User').findByIdAndUpdate(
    req.params.id,
    { $set: req.body }
  ))
});

/**
 * DELETE - /:id - Supprimer un user
 */
router.delete('/:id', checkToken, async (req, res, next) => {
  res.json(await mongoose.model('User').findByIdAndRemove(req.params.id))
});

module.exports = router;