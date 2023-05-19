
// Les modules requis (express, morgan, serve-favicon, cors) sont importés.
const express = require('express');
const morgan = require('morgan');
const serveFavicon = require('serve-favicon');
const sequelize = require('./db/sequelize');
const app = express();
const cors = require('cors');
const port = 3002;

// La base de données est initialisée en appelant la méthode initDb() de l'objet sequelize.
sequelize.initDb();

// Configuration de l'application Express

app
    .use(morgan('dev')) // Middleware de logging des requêtes HTTP en mode développement
    .use(serveFavicon(__dirname + '/favicon.ico')) // Middleware de gestion de l'icône de favicon
    .use(express.json()) // Middleware pour parser les données JSON des requêtes
    .use(cors()); // Middleware pour gérer les CORS (Cross-Origin Resource Sharing)

// Les routes sont importées depuis leurs fichiers correspondants (coworkingRoutes, userRoutes, reviewRoutes).
const coworkingRouter = require('./routes/coworkingRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// Utilisation des routes dans l'application
app.use('/api/coworkings', coworkingRouter);
app.use('/api/users', userRouter);
app.use('/api/reviews', reviewRouter);

// Le serveur est démarré en écoutant sur le port spécifié (3002), et un message est affiché dans la console pour indiquer que l'application est en cours d'exécution.
app.listen(port, () => {
    console.log(`L'application est en cours d'exécution sur le port ${port}`);
});
