const axios = require("axios");

async function getRecipesByCategory(category) {
  try {
    const response = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in recipe service:", error);
    throw new Error("Failed to fetch recipes from external API");
  }
}

module.exports = { getRecipesByCategory };
