const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../controllers/skillController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protected
router.post('/', authMiddleware, createSkill);
router.put('/:id', authMiddleware, updateSkill);
router.delete('/:id', authMiddleware, deleteSkill);

// Public
router.get('/', getAllSkills);



module.exports = router;
