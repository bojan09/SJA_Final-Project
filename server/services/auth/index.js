const config = require("../../pkg/config");
const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const auth = require("./handlers/auth");
const db = require("../../pkg/db");

db.init();

const app = express();

app.use(express.json());
app.use(
  jwt({
    algorithms: ["HS256"],
    secret: config.get("security").jwt_secret,
  }).unless({
    path: ["/api/v1/auth/signup", "/api/v1/auth/login", "api/v1/auth/update"],
  })
);

app.post("/api/v1/auth/signup", auth.create);
app.post("/api/v1/auth/login", auth.login);
app.patch("/api/v1/auth/update", auth.update);

app.post("/api/v1/auth/validate-token", auth.validate);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token...");
  } else {
    next(err);
  }
});

app.listen(config.get("services").auth.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    "Service [auth] successfully started on port",
    config.get("services").auth.port
  );
});
