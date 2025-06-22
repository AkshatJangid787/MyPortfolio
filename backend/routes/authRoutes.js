const express = require('express');
const router = express.Router();
const { login, logout } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', authMiddleware, (req, res) => {
  res.json({ isAuthenticated: true });
});

module.exports = router;
