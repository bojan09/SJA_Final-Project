const strings = require("../../../pkg/strings");
require("mime-types");

const upload = async (req, res) => {
  let fileTypes = [
    "image/png",
    "image/jpg",
    "image/pjpeg",
    "image/jpeg",
    "image/gif",
  ];
  let maxFileSize = 1024 * 1024;
  if (!fileTypes.includes(req.files.filename.mimetype)) {
    return res
      .status(400)
      .send("Bad request!, file does not meet format requirements");
  }
  if (maxFileSize < req.files.filename.size) {
    return res
      .status(400)
      .send("Bad request!, file does not meet size requirements");
  }
  let newFileName = `${strings.random(10)}__${req.files.filename.name}`;
  await req.files.filename.mv(
    `${__dirname}/../../../pkg/uploads/${newFileName}`
  );
  res.status(201).send({ filename: newFileName });
};

module.exports = {
  upload,
};
