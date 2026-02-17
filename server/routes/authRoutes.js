const express = require('express');
const {
  register,
  login,
  validateToken,
} = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/validate', authMiddleware, validateToken);

module.exports = router;
