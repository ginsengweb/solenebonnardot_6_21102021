//Import express
const express = require("express")

//Link express / routes
const router = express.Router()

//Import controllers
const saucesCtrl = require("../controllers/sauces")
// Import middlewares
const auth = require("../middleware/auth")
const multer = require("../middleware/multer-config")

//Router : middlewares. Récupération sauces et implémentation CRUD
//Auth: middlewares d'authentifications
//Multer : import et sauvegarde des fichiers externes
router.get("/", auth, saucesCtrl.getAllSauces)
router.post("/", auth, multer, saucesCtrl.createSauce)
router.get("/:id", auth, saucesCtrl.getOneSauce)
router.put("/:id", auth, multer, saucesCtrl.modifySauce)
router.delete("/:id", auth, multer, saucesCtrl.deleteSauce)

module.exports = router
