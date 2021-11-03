const multer = require("multer")

var file = require("file-system")
var fs = require("fs")

//Configuration des extensions des fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
}

//Création du dossier "images" s'il n'existe pas
fs.mkdir("./images", function (image) {
  if (!image || (image && image.code === "EEXIST")) {
    console.log("Dossier déjà existant")
  } else {
    console.log("Votre dossier a bien été créé")
  }
})
// Stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images")
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_")
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + "." + extension)
  },
})
// export multer entièrement configuré avec notre constante storage
module.exports = multer({storage: storage}).single("image")
