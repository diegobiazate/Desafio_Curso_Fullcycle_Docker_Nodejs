const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  const name = 'Diego Biazate';
  const queryInsert = `INSERT INTO people(name) VALUES('${name}')`;

  connection.query(queryInsert, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }

    connection.query('SELECT name FROM people', (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
      }

      let response = '<h1>Full Cycle Rocks!</h1>';
      response += '<ul>';
      results.forEach(row => {
        response += `<li>${row.name}</li>`;
      });
      response += '</ul>';
      res.send(response);
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
