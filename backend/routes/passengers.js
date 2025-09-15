// backend/routes/passengers.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM passengers ORDER BY passenger_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

router.post('/', async (req, res) => {
  const { name, phone_number, email, is_verified } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  try {
    const q = `INSERT INTO passengers (name, phone_number, email, is_verified)
               VALUES ($1,$2,$3,$4) RETURNING *`;
    const { rows } = await pool.query(q, [name, phone_number || null, email || null, !!is_verified]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// similar GET /:id, PUT /:id, DELETE /:id can be added as needed

module.exports = router;
