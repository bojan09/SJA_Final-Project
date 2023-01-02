const jwt = require("jsonwebtoken");
const User = require("../../../pkg/user");

const requireAuth = async (req, res, next) => {
  // verify authorization
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send("Authorization token required");
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, config.get("security").jwt_secret);

    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Request is not authorized");
  }
};

module.exports = requireAuth;
