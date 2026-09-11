// Importation des modules
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Importation du modèle User
const User = require("./models/User");

// Chargement des variables d'environnement
dotenv.config({
  path: "./config/.env"
});

// Création de l'application Express
const app = express();

// Permet à Express de lire les données JSON
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
  })
  .catch((error) => {
    console.error("Erreur de connexion MongoDB :", error);
  });


// ==========================================
// GET : récupérer tous les utilisateurs
// ==========================================

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error: error.message
    });
  }
});


// ==========================================
// POST : ajouter un utilisateur
// ==========================================

app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de l'utilisateur",
      error: error.message
    });
  }
});


// ==========================================
// PUT : modifier un utilisateur par ID
// ==========================================

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la modification",
      error: error.message
    });
  }
});


// ==========================================
// DELETE : supprimer un utilisateur par ID
// ==========================================

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "Utilisateur introuvable"
      });
    }

    res.status(200).json({
      message: "Utilisateur supprimé avec succès",
      user: deletedUser
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la suppression",
      error: error.message
    });
  }
});


// ==========================================
// Démarrage du serveur
// ==========================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});