const express = require("express");
const config = require("../../pkg/config");
const fileUpload = require("express-fileupload");
const { expressjwt: jwt } = require("express-jwt");
const storage = require("./handlers/storage");

const app = express();

app.use(
  jwt({
    algorithms: ["HS256"],
    secret: config.get("security").jwt_secret,
  })
);
app.use(fileUpload());

app.post("/api/v1/storage", storage.upload);

app.listen(config.get("services").storage.port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(
    "Service [storage] successfully started on port",
    config.get("services").storage.port
  );
});
