const config = require("../../pkg/config/index");
const db = require("../../pkg/db");
const { expressjwt: jwt } = require("express-jwt");

const Recipe = require("./handlers/recipeHandlers");

const express = require("express");
const app = express();

db.init();

app.use(express.json());
app.use(
  jwt({
    algorithms: ["HS256"],
    secret: config.get("security").jwt_secret,
  }).unless({
    path: [
      "/api/v1/recipes/breakfast",
      "/api/v1/recipes/brunch",
      "/api/v1/recipes/lunch",
      "/api/v1/recipes/dinner",
    ],
  })
);

app.get("/api/v1/recipes/", Recipe.getAllRecipes);

app.get("/api/v1/recipes/me", Recipe.getMine);

app.get("/api/v1/recipes/breakfast", Recipe.getAllBreakfastRecipes);

app.get("/api/v1/recipes/brunch", Recipe.getAllBrunchRecipes);

app.get("/api/v1/recipes/lunch", Recipe.getAllLunchRecipes);

app.get("/api/v1/recipes/dinner", Recipe.getAllDinnerRecipes);

app.post("/api/v1/recipes/", Recipe.createRecipe);

app.patch("/api/v1/recipes/:id", Recipe.updateRecipe);

app.put("/api/v1/recipes/:id", Recipe.starRecipe);

app.delete("/api/v1/recipes/:id", Recipe.deleteRecipe);

module.exports = Recipe;

app.listen(config.get("services").recipes.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    "Service [recipes] successfully started on port",
    config.get("services").recipes.port
  );
});
