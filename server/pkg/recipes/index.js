const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "recipe",
  {
    author_id: String,
    category: String,
    title: String,
    recipeDescription: String,
    shortDescription: String,
    preperationTime: Number,
    persons: Number,
    starsCount: Number,
    recipePicture: String,
    createdOn: { type: Date, default: Date.now },
  },
  "recipes"
);

const getAll = async () => {
  return Recipe.find({});
};

const getUserRecipes = async (author_id) => {
  return Recipe.find({ author_id });
};

const getBreakfast = async () => {
  return Recipe.find({ category: /^breakfast/i });
};

const getBrunch = async () => {
  return Recipe.find({ category: /^brunch/i });
};

const getLunch = async () => {
  return Recipe.find({ category: /^lunch/i });
};

const getDinner = async () => {
  return Recipe.find({ category: /^dinner/i });
};

const create = async (data) => {
  const r = new Recipe(data);
  return r.save();
};

const update = async (id, uid, data) => {
  return Recipe.updateOne({ _id: id, author_id: uid }, data);
};

const star = async (id) => {
  return Recipe.updateOne({ _id: id }, { $inc: { starsCount: +1 } });
};

const deleteRecipe = async (id, uid) => {
  return Recipe.deleteOne({ _id: id, author_id: uid });
};

module.exports = {
  getAll,
  getUserRecipes,
  getBreakfast,
  getBrunch,
  getLunch,
  getDinner,
  create,
  update,
  star,
  deleteRecipe,
};
