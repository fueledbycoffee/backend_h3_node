const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

/**
 * GET - / - Récupérer tous les grades
 */
router.get('/', async (req, res, next) => {
  const items = await mongoose.model('Grade').find({}).populate("student", "firstName lastName");

  res.json(items);
});

/**
 * POST - / - Créer un grade
 */
router.post('/', async (req, res, next) => {

  // Dans un veritable projet, on aurait des vérifications d'intégrité de données

  res.json(await mongoose.model('Grade').create(req.body));
});

/**
 * PUT - /:id - Mettre à jour un grade
 */
router.put('/:id', async (req, res, next) => {
  res.json(await mongoose.model('Grade').findByIdAndUpdate(
    req.params.id,
    { $set : req.body } 
  ))
});

/**
 * DELETE - /:id - Supprimer un grade
 */
router.delete('/:id', async (req, res, next) => {
  res.json(await mongoose.model('Grade').findByIdAndRemove(req.params.id))
});

module.exports = router;