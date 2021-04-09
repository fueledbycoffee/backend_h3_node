const express = require('express'),
      router = express.Router();

const studentsRouter = require('./students');

router.use('/students', studentsRouter);

module.exports = router;