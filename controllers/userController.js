const { Op, UniqueConstraintError, ValidationError } = require('sequelize');
const { UserModel } = require('../db/sequelize')

// Trouver tous les utilisateurs
// findAllUsers: Récupère tous les utilisateurs de la base de données en utilisant le modèle UserModel. Le scope 'withoutPassword' est utilisé pour exclure le mot de passe des utilisateurs lors de la récupération. Les utilisateurs sont renvoyés en tant que données de réponse dans un objet JSON avec un message indiquant le succès de l'opération.
exports.findAllUsers = (req, res) => {
    // Utiliser le scope "withoutPassword" du modèle UserModel pour exclure le mot de passe lors de la récupération des utilisateurs
    UserModel.scope('withoutPassword').findAll()
        .then((elements)=>{
            const msg = 'La liste des utilisateurs a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
}
// Les erreurs sont gérées et renvoyées avec un code d'état 500 en cas de problème lors de la récupération des utilisateurs.







