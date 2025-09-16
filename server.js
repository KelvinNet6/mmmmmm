const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON request body

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',   // Replace with your actual password
  database: 'your_database'    // Replace with your actual database name
});

db.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('❌ Query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      res.json({ message: '✅ Login successful!' });
    } else {
      res.json({ message: '❌ Invalid credentials' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
