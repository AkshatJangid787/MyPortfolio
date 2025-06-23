const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const isAuthenticated = require('../middlewares/authMiddleware');

router.get('/', getAllProjects);
router.post('/', isAuthenticated, createProject);
router.put('/:id', isAuthenticated, updateProject);
router.delete('/:id', isAuthenticated, deleteProject);

module.exports = router;
