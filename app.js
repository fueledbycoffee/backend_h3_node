const express = require('express'),
      logger = require('morgan'),
      mongoose = require('mongoose');

const config = require('./config.json');

/**
 * On charge une fois les entités histoire d'être sur qu'elles soient enregistrés
 * au près de mongoose lorsque l'on souhaitera y faire appel
 */
require('./models/User');
require('./models/Student');
require('./models/Grade');
require('./models/Classroom');

const globalRouter = require('./routes');

const app = express();

let connectionString = `${config.mongodb.connStr}/${config.mongodb.database}`;

if(process.env.MONGODB_URI)
  connectionString = process.env.MONGODB_URI;

mongoose.connect(
  connectionString,
  {
    // Les paramètres ici évident des DeprecationWarnings, c.f. : https://mongoosejs.com/docs/deprecations.html
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

/**
 * En mode 'dev' morgan va log uniquement les codes erreurs 4xx et 5xx
 * On configure express pour qu'il soit capable de parser les payload JSON et URL Encoded
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', globalRouter);

// Gestionnaire d'erreurs
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    stack: req.app.get('env') === 'development' ? JSON.stringify(err) : null
  });
});

module.exports = app;