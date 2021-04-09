const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

/**
 * GET - / - Récupérer tous les étudiants
 */
router.get('/', async (req, res, next) => {
  const items = await mongoose.model('Student').find({});

  res.json(items);
});

/**
 * POST - / - Créer un étudiant
 */
router.post('/', async (req, res, next) => {

  // Dans un veritable projet, on aurait des vérifications d'intégrité de données

  res.json(await mongoose.model('Student').create(req.body));
});

/**
 * PUT - /:id - Mettre à jour un étudiant
 */
router.put('/:id', async (req, res, next) => {
  res.json(await mongoose.model('Student').findByIdAndUpdate(
    req.params.id,
    { $set : req.body } 
  ))
});

/**
 * DELETE - /:id - Supprimer un étudiant
 */
router.delete('/:id', async (req, res, next) => {
  res.json(await mongoose.model('Student').findByIdAndRemove(req.params.id))
});

module.exports = router;