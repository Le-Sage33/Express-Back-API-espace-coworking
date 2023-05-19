
// Le module Express est importé, et un routeur (router) est créé.
const express = require('express');
const router = express.Router();
// Les contrôleurs coworkingController et authController sont importés depuis leurs fichiers correspondants.
const coworkingController = require('../controllers/coworkingController');
const authController = require('../controllers/authController');
// Les routes sont définies en utilisant le routeur (router) et les méthodes HTTP correspondantes (GET, POST, PUT, DELETE).
// Définition des routes de l'application

// La route principale (/) permet d'obtenir tous les espaces de coworking (GET) et de créer un nouvel espace de coworking (POST).
router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    .post(coworkingController.createCoworking);

    // Exemple d'utilisation d'un middleware d'authentification commenté pour protéger la création d'un espace de coworking

    // .post(authController.protect, coworkingController.createCoworking);
    


// La route /withReview permet d'obtenir tous les espaces de coworking avec les avis associés.
router
    .route('/withReview')
    .get(coworkingController.findAllCoworkingsByReviewSQL);

// Route pour obtenir un espace de coworking par son identifiant
router
// La route /:id permet d'obtenir un espace de coworking spécifique par son identifiant et permet également de le mettre à jour (PUT) ou de le supprimer (DELETE).
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(coworkingController.updateCoworking)
    .delete(coworkingController.deleteCoworking);

    // Des exemples d'utilisation de middlewares d'authentification et d'autorisation sont commentés pour protéger les opérations de création, de mise à jour et de suppression des espaces de coworking.

    // .put(authController.protect, coworkingController.updateCoworking);
    // .delete(authController.protect, authController.restrictTo('user', 'admin'), coworkingController.deleteCoworking);
    

module.exports = router;
