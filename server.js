const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Allow GitHub Pages frontend
app.use(express.json()); // Parse JSON body

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });

    if (results.length > 0) {
      res.json({ message: 'Login successful!' });
    } else {
      res.json({ message: 'Invalid credentials' });
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
