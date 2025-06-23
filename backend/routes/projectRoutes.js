const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protected (admin only)
router.post('/', authMiddleware, createProject);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);

// Public
router.get('/', getAllProjects);

module.exports = router;
