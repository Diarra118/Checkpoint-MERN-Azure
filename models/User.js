// Importation de Mongoose
const mongoose = require("mongoose");

// Création du schéma User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  age: {
    type: Number
  }
});

// Création et exportation du modèle User
module.exports = mongoose.model("User", userSchema);