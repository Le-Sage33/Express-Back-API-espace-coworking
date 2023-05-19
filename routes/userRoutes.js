
// Le module Express est importé, et un routeur (router) est créé.
const express = require('express');
const router = express.Router();
// Les contrôleurs userController et authController sont importés depuis leurs fichiers correspondants.
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Les routes sont définies en utilisant le routeur (router) et les méthodes HTTP correspondantes (GET, POST).
// Définition des routes de l'application:

// Route pour obtenir tous les utilisateurs
router
    .route('/')
    // La route principale (/) permet d'obtenir tous les utilisateurs (GET).
    .get(userController.findAllUsers);

// Route de connexion (login)
router
    .route('/login')
    // La route /login permet de se connecter en appelant la méthode login du contrôleur d'authentification (authController).
    .post(authController.login);

// Route d'inscription (signup)
router
    .route('/signup')
    // La route /signup permet de s'inscrire en appelant la méthode signup du contrôleur d'authentification (authController).
    .post(authController.signup);

module.exports = router;
