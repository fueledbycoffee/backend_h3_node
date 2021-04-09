const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose');

/**
 * GET - / - Récupérer tous les classrooms
 */
router.get('/', async (req, res, next) => {
  const items = await mongoose.model('Classroom').find({}).populate("students", "firstName lastName");

  res.json(items);
});

/**
 * POST - / - Créer un classroom
 */
router.post('/', async (req, res, next) => {

  // Dans un veritable projet, on aurait des vérifications d'intégrité de données

  res.json(await mongoose.model('Classroom').create(req.body));
});

/**
 * PUT - /:id - Mettre à jour un classroom
 */
router.put('/:id', async (req, res, next) => {
  res.json(await mongoose.model('Classroom').findByIdAndUpdate(
    req.params.id,
    { $set : req.body } 
  ))
});

/**
 * PUT - /:id - Mettre à jour un classroom
 */
router.put('/:id/students', async (req, res, next) => {
  const classroom = await mongoose.model('Classroom').findById(req.params.id);

  classroom.students = [...classroom.students, ...req.body.ids];

  await classroom.save();

  res.json(classroom);
});

/**
 * DELETE - /:id - Supprimer un classroom
 */
router.delete('/:id', async (req, res, next) => {
  res.json(await mongoose.model('Classroom').findByIdAndRemove(req.params.id))
});

module.exports = router;