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
function getServices() {
  return db.many('SELECT id, code, name, description, price, capacity, relatedGoals, dependencies FROM services;');
}
function insertProject(dataObj) {
  return db.one('INSERT INTO projects (client_id, name, payment_method, total, bundle_name, bundle_id) VALUES (${clientId}, ${name}, ${paymentMethod}, ${bundle.price}, ${bundle.name}, ${bundle.id}) RETURNING id;', dataObj);
}
function insertClient(dataObj) {
  return db.one('INSERT INTO clients (company_name, contact_name, email, phone) VALUES (${company}, ${name}, ${email}, ${phone}) RETURNING id;', dataObj);
}
function updateName(dataObj) {
  return db.one('UPDATE clients SET contact_name = ${name} WHERE id = ${clientId} RETURNING id;', dataObj);
}
function updateCompany(dataObj) {
  return db.one('UPDATE clients SET company_name = ${company} WHERE id = ${clientId} RETURNING id;', dataObj);
}
function updateEmail(dataObj) {
  return db.one('UPDATE clients SET email = ${email} WHERE id = ${clientId} RETURNING id;', dataObj);
}
function updatePhone(dataObj) {
  return db.one('UPDATE clients SET phone = ${phone} WHERE id = ${clientId} RETURNING id;', dataObj);
}
function updateClient(dataObj) {
  return db.one('UPDATE clients SET contact_name = COALESCE(${name}, contact_name), company_name = COALESCE(${company}, company_name), email = COALESCE(${email}, email), phone = COALESCE(${phone}, phone) WHERE id = ${clientId} AND (${name} IS NOT NULL AND ${name} IS DISTINCT FROM contact_name OR ${company} IS NOT NULL AND ${company} IS DISTINCT FROM company_name OR ${email} IS NOT NULL AND ${email} IS DISTINCT FROM email OR ${phone} IS NOT NULL AND ${phone} IS DISTINCT FROM phone) RETURNING id;', dataObj);
}

// function updateClient(dataObj) {
//   return db.one('UPDATE clients SET company_name = ${company}, contact_name = ${name}, email = ${email}, phone = ${phone} WHERE id = ${clientId} RETURNING id;', dataObj);
// }


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

app.get('/api/services', function(req, res, next) {
  getServices()
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from GET services block in server code.');
      res.status(500).send('error in GET services block of server code.');
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
app.post('/api/update-name', function(req, res, next) {
  updateName(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from POST update client block of server code.');
      res.status(500).send('err from POST update client block of server code.');
    });
});
app.post('/api/update-company', function(req, res, next) {
  updateCompany(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from POST update client block of server code.');
      res.status(500).send('err from POST update client block of server code.');
    });
});
app.post('/api/update-email', function(req, res, next) {
  updateEmail(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from POST update client block of server code.');
      res.status(500).send('err from POST update client block of server code.');
    });
});
app.post('/api/update-phone', function(req, res, next) {
  updatePhone(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from POST update client block of server code.');
      res.status(500).send('err from POST update client block of server code.');
    });
});
app.post('/api/update-client', function(req, res, next) {
  updateClient(req.body)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.log(err, 'err from POST update client block of server code.');
      res.status(500).send('err from POST update client block of server code.');
    });
});


const server = http.createServer(app);

server.listen(port, function() {
  console.log('Listening on port ' + port);
});