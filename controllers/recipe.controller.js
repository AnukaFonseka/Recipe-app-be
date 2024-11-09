const recipeService = require("../services/recipe.service");

async function fetchRecipesByCategory(req, res) {
  const { category } = req.params;

  try {
    const recipes = await recipeService.getRecipesByCategory(category);
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
}

module.exports = { fetchRecipesByCategory };
