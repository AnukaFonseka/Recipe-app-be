const express = require('express');
const { fetchRecipesByCategory } = require('../controllers/recipe.controller');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/category/:category', verifyToken, fetchRecipesByCategory);

module.exports = router;
