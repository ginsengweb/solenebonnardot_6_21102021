//Import mongoose
const mongoose = require("mongoose")

//Mail unique
const uniqueValidator = require("mongoose-unique-validator")

// Schéma d'utilisateur
const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
})

// Package de pré-validation avant enregistrement
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("user", userSchema)
