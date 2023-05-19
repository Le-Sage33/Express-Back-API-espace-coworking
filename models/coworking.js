
// Ce code définit le modèle Coworking avec différentes propriétés et validations. Voici ce que fait chaque partie du code
// Le modèle Coworking est défini en utilisant sequelize.define.
// Les différentes colonnes du modèle sont définies avec leurs types de données, contraintes et validations.
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // Le champ name est requis, unique et ne peut pas être vide.
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom est déjà pris'
            },
            validate: {
                notEmpty: {
                  msg: 'Ce champ ne peut pas être vide.'
                }
              }
        },
        picture: {
            type: DataTypes.STRING,
        },

        // Le champ superficy est requis et doit être un entier.
        superficy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                  msg: 'La superficie doit être un entier.'
                }
              }
        },

        // Le champ capacity est requis et doit être un entier.
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                  msg: 'Le nombre de postes doit être un entier.'
                }
              }
        },

        // Le champ price est requis et doit être un objet JSON contenant au moins un des 3 tarifs (hour, day, month)
        price: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                isPriceValid(value) {
                    if(value.hasOwnProperty('hour') && value.hasOwnProperty('day') && value.hasOwnProperty('month')){
                        if ( value.hour === null && value.day === null && value.month === null  ) {
                            throw new Error("Au moins un des 3 tarifs doit être spécifié"); 
                          }
                    } else {
                        throw new Error("La syntaxe des données est incorrecte.");
                    }
                }
              }
        },
        // Le champ address est un objet JSON.
        address: {
            type: DataTypes.JSON,
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}
// Les options du modèle sont définies, notamment les timestamps pour la création et la mise à jour des enregistrements.
// Le modèle est retourné pour être utilisé dans d'autres fichiers.