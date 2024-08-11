// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'harshkrsonkar@gmail.com', // replace with your MySQL username
  password: '!Sinam@1969', // replace with your MySQL password
  database: 'timer' // replace with your MySQL database name
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

// Routes
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM takeuforward', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/data', (req, res) => {
  const { description, time, link, isVisible } = req.body;
  const query = 'INSERT INTO takeuforward (description, time, link, isVisible) VALUES (?, ?, ?, ?)';
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
  console.log('Updating record with values:', { description, time, link, isVisible, id });

  const query = 'UPDATE takeuforward SET description = ?, time = ?, link = ?, isVisible = ? WHERE id = ?';
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
