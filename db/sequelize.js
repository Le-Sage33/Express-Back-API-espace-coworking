
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const CoworkingModelSequelize = require('../models/coworking')
const UserModelSequelize = require('../models/user')
const ReviewModelSequelize = require('../models/review')
const coworkings = require('../mock-coworkings');

// Créer une instance Sequelize pour établir la connexion à la base de données
const sequelize = new Sequelize('lapiscine_coworking', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

// Définir les modèles Coworking, User et Review en utilisant les fonctions des fichiers correspondants
const CoworkingModel = CoworkingModelSequelize(sequelize, DataTypes)
const UserModel = UserModelSequelize(sequelize, DataTypes)
const ReviewModel = ReviewModelSequelize(sequelize, DataTypes)

// Définir les relations entre les modèles
UserModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});
ReviewModel.belongsTo(UserModel); 

CoworkingModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});
ReviewModel.belongsTo(CoworkingModel);

// Fonction pour initialiser la base de données
const initDb = () => {
    return sequelize.sync({ force: true }) 
    .then(() => {
        // Création des 11 coworkings dans la base de données en utilisant les données du tableau "coworkings"
        coworkings.forEach((element) => {
            CoworkingModel.create({
                name: element.name,
                price: element.price,
                address: element.address,
                superficy: element.superficy,
                capacity: element.capacity,
            })
        })

        // Création d'un utilisateur "paul" avec un mot de passe haché et les rôles "user" et "admin"
        bcrypt.hash('mdp', 10)
            .then((hash) => {
                UserModel.create({
                    username: 'paul',
                    password: hash,
                    roles: ['user', 'admin']
                })
            })
            .catch(err => console.log(err))

        // Création d'un utilisateur "pierre" avec un mot de passe haché et le rôle "user"
        bcrypt.hash('mdp', 10)
        .then((hash) => {
            UserModel.create({
                username: 'pierre',
                password: hash,
                roles: ['user']
            })
        })
        .catch(err => console.log(err))
    })
    .catch(error => console.log('Erreur'))
}

// Vérification de la connexion à la base de données
sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

// Exportation des instances, modèles et fonctions nécessaires
module.exports = {
    sequelize, CoworkingModel, UserModel, initDb, ReviewModel
}
// Ce code initialise la base de données en créant les tables et en insérant des enregistrements de test. Voici ce que fait chaque partie du code :

// Les packages nécessaires sont importés.
// Une instance Sequelize est créée pour établir la connexion à la base de données.
// Les modèles Coworking, User et Review sont définis en utilisant les fonctions correspondantes.
// Les relations entre les modèles sont définies.
// La fonction initDb est définie pour initialiser la base de données en synchronisant les modèles et en créant des enregistrements de test pour les coworkings et les utilisateurs.
// La connexion à la base de données est vérifiée.
// Les instances, modèles et fonctions nécessaires sont exportés pour être utilisés dans d'autres fichiers.