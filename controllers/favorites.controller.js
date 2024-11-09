const favoritesService = require('../services/favorites.service');

//Add favourite recipe
async function addFavoriteRecipe(req, res) {
  const { recipeId, recipeTitle, recipeCategory, recipeImgURL } = req.body;
  const userId = req.user.userId;
  try {

    // Check if the recipe is already a favorite
    const favoriteExists = await favoritesService.findFavouriteRecipeById(userId, recipeId);
    if (favoriteExists) {
      return res.status(400).json({ message: 'Recipe already in favorites' });
    }

    await favoritesService.addFavorite(userId, recipeId, recipeTitle, recipeCategory, recipeImgURL);
    res.status(201).json({ message: 'Recipe added to favorites successfully' });
  } catch (error) {
    console.error('Error adding favorite recipe:', error);
    res.status(500).json({ message: 'Failed to add favorite recipe' });
  }
}

//Get all favorite recipes of the user
async function getFavoriteRecipes(req, res) {
  const userId = req.user.userId;

  try {
    const favorites = await favoritesService.getFavoritesByUserId(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    res.status(500).json({ message: 'Failed to fetch favorite recipes' });
  }
}

//Remove a recipe from favorites
async function removeFavoriteRecipe(req, res) {
  const { recipeId } = req.params;
  const userId = req.user.userId;

  try {
    await favoritesService.removeFavorite(userId, recipeId);
    res.status(200).json({ message: 'Recipe removed from favorites successfully' });
  } catch (error) {
    console.error('Error removing favorite recipe:', error);
    res.status(500).json({ message: 'Failed to remove favorite recipe' });
  }
}

module.exports = { addFavoriteRecipe, getFavoriteRecipes, removeFavoriteRecipe };
