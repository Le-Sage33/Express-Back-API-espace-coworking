let coworkings = require('../mock-coworkings');
const { Op, UniqueConstraintError, ValidationError, QueryTypes } = require('sequelize');
const { CoworkingModel, ReviewModel, sequelize } = require('../db/sequelize')

// Trouver tous les espaces de coworking
exports.findAllCoworkings = (req, res) => {
    if(req.query.search){
        // Effectuer une recherche avec des paramètres
        CoworkingModel.findAll({ where: { name: {[Op.like] : `%${req.query.search}%`} } })
        .then((elements)=>{
            if(!elements.length){
                return res.json({message: "Aucun coworking ne correspond à votre recherche"})    
            }
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    } else {
        // Récupérer tous les espaces de coworking
        CoworkingModel.findAll()
        .then((elements)=>{
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({message: msg, data: elements})
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({message: msg})
        })
    }
}

// Trouver un espace de coworking par son ID
exports.findCoworkingByPk = (req, res) => {
    // Afficher l'espace de coworking correspondant à l'ID spécifié dans les paramètres, en le récupérant dans la base de données
    CoworkingModel.findByPk(req.params.id, {
        include: ReviewModel
    })
        .then(coworking => {
            if (coworking === null) {
                const message = `Le coworking demandé n'existe pas.`
                res.status(404).json({ message })
            } else {
                const message = "Un coworking a bien été trouvé."
                res.json({ message, data: coworking });
            }
        })
        .catch(error => {
            const message = `La liste des coworkings n'a pas pu se charger. Réessayez ultérieurement.`
            res.status(500).json({ message, data: error })
        })
}

// Trouver tous les espaces de coworking ayant des évaluations d'un certain niveau de notation ou plus
exports.findAllCoworkingsByReview = (req, res) => {
    const minRate = req.query.minRate || 4
    CoworkingModel.findAll({
        include: {
            model: ReviewModel,
            where: {
                rating: { [Op.gte]: 4 }
            }
        }
    })
    .then((elements)=>{
        const msg = 'La liste des coworkings a bien été récupérée en base de données.'
        res.json({message: msg, data: elements})
    })
    .catch((error) => {
        const msg = 'Une erreur est survenue.'
        res.status(500).json({message: msg})
    })
}

// Trouver tous les espaces de coworking en utilisant une requête SQL pure
exports.findAllCoworkingsByReviewSQL = (req, res) => {
    return sequelize.query('SELECT name, rating FROM `coworkings` LEFT JOIN `reviews` ON `coworkings`.`id` = `reviews`.`coworkingId`',
        {
            type: QueryTypes.SELECT
        }
    )
        .then(coworkings => {
            const message = `Il y a ${coworkings.length} coworkings comme résultat de la requête en SQL pur.`
            res.json({ message, data: coworkings })
        })
        .catch(error => {
            const message = `La liste des coworkings n'a pas pu se charger. Réessayez ultérieurement.`
            res.status(500).json({ message, data: error })
        })
}

// Mettre à jour un espace de coworking
exports.updateCoworking = (req, res) => {
    // Modifier l'espace de coworking en base de données correspondant à l'ID spécifié dans les paramètres
    CoworkingModel.update(req.body, {
        where: {
            id: req.params.id
        }
    }).then((coworking) => {
        if(coworking === null){
            const msg = "Le coworking demandé n'existe pas."
            res.json({message: msg})
        } else {
            const msg = "Le coworking a bien été modifié."
            res.json({message: msg, data: coworking})
        }
    }).catch((error) => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        const msg = "Impossible de mettre à jour le coworking."
        res.status(500).json({message: msg})
    })
}

// Supprimer un espace de coworking
exports.deleteCoworking = (req, res) => {
    CoworkingModel.findByPk(req.params.id)
        .then(coworking => {
            if (coworking === null) {
                const message = `Le coworking demandé n'existe pas.`
                return res.status(404).json({ message })
            }
            return CoworkingModel.destroy({
                where: {
                    id: req.params.id
                }
            })
                .then(() => {
                    const message = `Le coworking ${coworking.name} a bien été supprimé.`
                    res.json({ message, data: coworking });
                })
        })
        .catch(error => {
            const message = `Impossible de supprimer le coworking.`
            res.status(500).json({ message, data: error })
        })
}

// Créer un nouvel espace de coworking
exports.createCoworking = (req, res) => {
    let newCoworking = req.body;

    CoworkingModel.create({
        name: newCoworking.name,
        price: newCoworking.price,
        address: newCoworking.address,
        picture: newCoworking.picture,
        superficy: newCoworking.superficy,
        capacity: newCoworking.capacity
    }).then((el) => {
        const msg = 'Un coworking a bien été ajouté.'
        res.json({ message: msg, data: el })
    }).catch(error => {
        if(error instanceof UniqueConstraintError || error instanceof ValidationError){
            return res.status(400).json({message: error.message, data: error})
        } 
        res.status(500).json(error)
    })
}
