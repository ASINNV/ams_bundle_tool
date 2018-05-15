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

function getClients() {
  return db.many('SELECT * FROM clients;');
}
function getGoals() {
  return db.many('SELECT * FROM goals;');
}
function getGoalRelations() {
  return db.many('SELECT * FROM goalRelations;');
}
function getBundles() {
  return db.many('SELECT id, name, description, price, discount FROM bundles;');
}
function insertProject(dataObj) {
  return db.one('INSERT INTO projects (client_id, name, payment_method, total, bundle_name, bundle_id) VALUES (${clientId}, ${name}, ${paymentMethod}, ${bundle.price}, ${bundle.name}, ${bundle.id}) RETURNING id;', dataObj);
}
function insertClient(dataObj) {
  return db.one('INSERT INTO clients (company_name, contact_name, email, phone) VALUES (${company}, ${name}, ${email}, ${phone}) RETURNING id;', dataObj);
}


app.get('/api/goals', function(req, res, next) {
  getGoals()
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from GET goals block in server code.');
      res.status(500).send('error in GET goals block of server code.');
    });
});

app.get('/api/goal-relations', function(req, res, next) {
  getGoalRelations()
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from GET goal relations block in server code.');
      res.status(500).send('error in GET goal relations block of server code.');
    });
});

app.get('/api/bundles', function(req, res, next) {
  getBundles()
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from GET bundles block in server code.');
      res.status(500).send('error in GET bundles block of server code.');
    });
});

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
app.post('/api/new-client', function(req, res, next) {
  insertClient(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from POST client block of server code.');
      res.status(500).send('err from POST client block of server code.');
    });
});


const server = http.createServer(app);

server.listen(port, function() {
  console.log('Listening on port ' + port);
});