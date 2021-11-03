// BASE DE DONNEES
const dotenv = require("dotenv")
const result = dotenv.config()
const mongoose = require("mongoose")
mongoose
  .connect(process.env.DB, process.env.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"))

// EXPRESS
const express = require("express")
const app = express()

// ROUTES
const saucesRoutes = require("./routes/sauces")
const userRoutes = require("./routes/user")
const likeRoute = require("./routes/like")

// CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  // Accès API multi-origine
  res.setHeader("Access-Control-Allow-Origin", "*")
  // Ajout header des requêtes à l'API
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  )
  // Méthodes
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  )
  next()
})

// EXPRESS --> MIDDLEWARE GLOBAL
app.use(express.json())

// URL
app.use("/api/sauces", saucesRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/sauces", likeRoute)

// IMAGES
const path = require("path")
app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
