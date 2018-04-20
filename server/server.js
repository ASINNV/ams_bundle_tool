const express = require('express');
const pgp = require('pg-promise')();
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

const db_obj = {
  host: 'localhost',
  port: 5432,
  database: 'ams',
  user: 'dev',
  password: process.env.PASSWORD
};

const db = pgp(db_obj);

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));


function insertProject(dataObj) {
  return db.one('INSERT INTO projects (name, total) VALUES (${name}, ${total}) RETURNING id;', dataObj);
}
function getClients() {
  return db.many('SELECT * FROM clients;');
}

app.get('/api/clients', function(req, res, next) {
  getClients()
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from GET clients block in server code.');
      res.status(500).send('error in GET clients block of server code.');
    });
});

app.post('/api/new-project', function(req, res, next) {
  insertProject(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from POST project block of server code.');
      res.status(500).send('err from POST project block of server code.');
    });
});


const server = http.createServer(app);

server.listen(port, function() {
  console.log('Listening on port ' + port);
});