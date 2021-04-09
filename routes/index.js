const express = require('express'),
      router = express.Router();

const studentsRouter = require('./students');
const gradesRouter = require('./grades');
const classroomsRouter = require('./classrooms');
const usersRouter = require('./users');
const authRouter = require('./auth');

router.use('/students', studentsRouter);
router.use('/grades', gradesRouter);
router.use('/classrooms', classroomsRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;