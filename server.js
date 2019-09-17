const express = require('express');

require('dotenv').config();

const helmet = require('helmet'); // secure headers
const bodyParser = require('body-parser'); // turn response into usable format
const cors = require('cors'); // cross-site communication
const morgan = require('morgan'); // reg logs

const db = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'crud-practice'
  }
});

const main = require('./controllers/main');

const app = express();

const whitelist = ['http://localhost:3001'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Hello world'));
app.get('/crud', (req, res) => main.getTableData(req, res, db));
app.post('/crud', (req, res) => main.postTableData(req, res, db));
app.put('/crud', (req, res) => main.putTableData(req, res, db));
app.delete('/crud', (req, res) => main.deleteTableData(req, res, db));

app.listen(process.ENV.PORT || 3000, () => {
  console.log(`app is running on port ${process.ENV.PORT || 3000}`);
});
