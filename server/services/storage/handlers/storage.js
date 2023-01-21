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
  let file = req.files.recipeImage;

  console.log(req.files);
  console.log(req.files.recipeImage);

  if (!fileTypes.includes(file.mimetype)) {
    return res
      .status(400)
      .send("Bad request!, file does not meet format requirements");
  }
  if (maxFileSize < file.size) {
    return res
      .status(400)
      .send("Bad request!, file does not meet size requirements");
  }
  let newFileName = `${strings.random(10)}__${file.name}`;

  await file.mv(`${__dirname}/../../../pkg/uploads/${newFileName}`);
  let filePath = `${__dirname}/../../../uploads/${req.params.file}`;

  res.status(201).send({ filename: newFileName, filePath: filePath });
};

const download = async (req, res) => {
  let filePath = `${__dirname}/../../../uploads/${req.params.file}`;

  res.download(filePath, req.params.file.split("__")[1], Headers);
};

module.exports = {
  upload,
  download,
};
