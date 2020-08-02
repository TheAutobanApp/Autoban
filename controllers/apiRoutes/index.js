const router = require('express').Router();
const columnRoutes = require('./columns');
const projectRoutes = require('./project');
const taskRoutes = require('./task');
const userRoutes = require('./user');

// All routes
router.use('/columns', columnRoutes);
router.use('/project', projectRoutes);
router.use('/user', userRoutes);
router.use('/task', taskRoutes);

module.exports = router;
