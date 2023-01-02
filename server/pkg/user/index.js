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
    CreatedOn: Date,
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

const updateUser = async (id, data) => {
  return User.updateOne({ _id: id }, data);
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
