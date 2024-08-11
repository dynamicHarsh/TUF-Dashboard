// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Routes
app.get('/api/data', (req, res) => {
  const query = `SELECT * FROM ${process.env.DB_TABLE}`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/data', (req, res) => {
  const { description, time, link, isVisible } = req.body;
  const query = `INSERT INTO ${process.env.DB_TABLE} (description, time, link, isVisible) VALUES (?, ?, ?, ?)`;
  db.query(query, [description, time, link, isVisible], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});

app.put('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const { description, time, link, isVisible } = req.body;
  const query = `UPDATE ${process.env.DB_TABLE} SET description = ?, time = ?, link = ?, isVisible = ? WHERE id = ?`;
  db.query(query, [description, time, link, isVisible, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ affectedRows: results.affectedRows });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
