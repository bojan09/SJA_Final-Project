const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  {
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    repeatPassword: String,
    birthdate: Date,
    createdOn: { type: Date, default: Date.now },
  },
  "users"
);

const getAllUsers = async () => {
  return User.find({});
};

const create = async (data) => {
  let u = new User(data);
  return u.save();
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUser = async (email, data) => {
  return User.updateOne({ email: email }, data);
};

const getById = async (uid, data) => {
  return User.findOne({ _id: uid }, data);
};

module.exports = {
  getAllUsers,
  create,
  getUserByEmail,
  updateUser,
  getById,
};
