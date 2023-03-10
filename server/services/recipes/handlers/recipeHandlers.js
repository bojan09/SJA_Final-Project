const Recipe = require("../../../pkg/recipes");
const auth = require("../../auth/handlers/auth");

const getAllRecipes = async (req, res) => {
  try {
    let rs = await Recipe.getAll();
    res.status(200).send(rs);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const getMine = async (req, res) => {
  try {
    let rs = await Recipe.getUserRecipes(req.auth.uid);
    res.status(200).send(rs);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const getAllBreakfastRecipes = async (req, res) => {
  try {
    let r = await Recipe.getBreakfast();
    res.status(200).send(r);
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error!");
  }
};

const getAllBrunchRecipes = async (req, res) => {
  try {
    let r = await Recipe.getBrunch();
    res.status(200).send(r);
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error!");
  }
};

const getAllLunchRecipes = async (req, res) => {
  try {
    let r = await Recipe.getLunch();
    res.status(200).send(r);
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error!");
  }
};

const getAllDinnerRecipes = async (req, res) => {
  try {
    let r = await Recipe.getDinner();
    res.status(200).send(r);
  } catch (err) {
    console.log(err);

    return res.status(500).send("Internal Server Error!");
  }
};

const createRecipe = async (req, res) => {
  try {
    let payload = {
      ...req.body,
      author_id: req.auth.uid,
      published_on: new Date(),
    };
    let c = await Recipe.create(payload);
    return res.status(201).send(c);
  } catch (err) {
    console.log(err);
    return res.status(500).send("ISE!");
  }
};

const updateRecipe = async (req, res) => {
  try {
    let payload = {
      ...req.body,
      author_id: req.auth.uid,
      published_on: new Date(),
    };
    await Recipe.update(req.params.id, req.auth.uid, payload);
    return res.status(200).send("Recipe Updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const starRecipe = async (req, res) => {
  try {
    let payload = {
      ...req.body,
      author_id: req.auth.uid,
    };
    let r = await Recipe.starRecipe(req.params.id, req.auth.uid, payload);

    return req.status(200).send(r);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    await Recipe.deleteRecipe(req.params.id, req.auth.uid);
    return res.status(204).send("Recipe deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error!");
  }
};

module.exports = {
  getAllRecipes,
  getMine,
  getAllBreakfastRecipes,
  getAllBrunchRecipes,
  getAllLunchRecipes,
  getAllDinnerRecipes,
  createRecipe,
  updateRecipe,
  starRecipe,
  deleteRecipe,
};
