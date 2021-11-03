//Import express
const express = require("express")
// Link express / router
const router = express.Router()

//Import controller
const likeCtrl = require("../controllers/like")

//Import auth
const auth = require("../middleware/auth")
//Route like
router.post("/:id/like", auth, likeCtrl.LikeOption)

module.exports = router
