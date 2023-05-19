
// Le module Express est importé, et un routeur (router) est créé.
const express = require('express');
const router = express.Router();
// Les contrôleurs reviewController et authController sont importés depuis leurs fichiers correspondants.
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');


// Les routes sont définies en utilisant le routeur (router) et les méthodes HTTP correspondantes (GET, POST, PUT).
// Définition des routes de l'application
// Route pour obtenir toutes les évaluations
router
    .route('/')
    // La route principale (/) permet d'obtenir toutes les évaluations (GET) et de créer une nouvelle évaluation (POST).
    .get(reviewController.findAllReviews)
    .post(authController.protect, reviewController.createReview);
    // Exemple d'utilisation d'un middleware d'authentification pour protéger la création d'une évaluation

// Route pour mettre à jour une évaluation spécifique par son identifiant
router
    .route('/:id')
    .put(authController.protect, authController.restrictToOwnUser, reviewController.updateReview);
    // Exemple d'utilisation de middlewares d'authentification et d'autorisation pour mettre à jour une évaluation,
    // en vérifiant que l'utilisateur est le propriétaire de l'évaluation

module.exports = router;
// Le routeur (router) est exporté pour être utilisé dans d'autres parties de l'application.
