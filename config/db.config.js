const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://meal-app:0dqtgjZ5JITmEQ65@cluster0.v6b1m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let dbClient;
let usersCollection;
let favoritesCollection;

async function connectToDatabase() {
  try {
    dbClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await dbClient.connect();
    const mealdb = dbClient.db("MealInventory");
    usersCollection = mealdb.collection("users");
    favoritesCollection = mealdb.collection("favorites");  // New collection for favorites

    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

function getUsersCollection() {
  return usersCollection;
}

function getFavoritesCollection() {  // Getter for the favorites collection
  return favoritesCollection;
}

module.exports = { connectToDatabase, getUsersCollection, getFavoritesCollection };
