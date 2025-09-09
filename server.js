// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'skytrail_database'
});

db.connect(err => {
    if(err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL connected');
    }
});

// LOGIN
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM uss_pass WHERE Uss = ? AND Passwd = ?';
    db.query(query, [username, password], (err, results) => {
        if(err) return res.json({ status: 'error', message: err.sqlMessage });
        if(results.length > 0){
            res.json({ status: 'ok', message: 'Login successful' });
        } else {
            res.json({ status: 'error', message: 'Invalid username or password' });
        }
    });
});

// SIGNUP
app.post('/signup', (req, res) => {
    const { username, password, email, dob, phoneno } = req.body;

    // Check if username already exists
    const checkQuery = 'SELECT * FROM uss_pass WHERE Uss = ?';
    db.query(checkQuery, [username], (err, results) => {
        if(err) return res.json({ status: 'error', message: err.sqlMessage });
        if(results.length > 0){
            return res.json({ status: 'error', message: 'Username already exists' });
        }

        // Insert into uss_pass
        const insertQuery = 'INSERT INTO uss_pass (Uss, Passwd, Email, dob, Phoneno) VALUES (?, ?, ?, ?, ?)';
        db.query(insertQuery, [username, password, email || '', dob || null, phoneno || ''], (err2) => {
            if(err2) return res.json({ status: 'error', message: err2.sqlMessage });
            res.json({ status: 'ok', message: 'Signup successful' });
        });
    });
});

// FLIGHTS SEARCH
app.post('/flights', (req, res) => {
    const { departure, arrival } = req.body;
    const query = 'SELECT * FROM alinfo WHERE Source = ? AND Destination = ?';
    db.query(query, [departure, arrival], (err, results) => {
        if(err) return res.status(500).json({ status: 'error', message: err.sqlMessage });
        res.json(results);
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

