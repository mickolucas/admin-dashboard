// backend/routes/drivers.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/drivers  — list all drivers
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM drivers ORDER BY driver_id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/drivers/:id  — single driver
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { rows } = await pool.query('SELECT * FROM drivers WHERE driver_id=$1', [id]);
    if (!rows[0]) return res.status(404).json({ error: 'Driver not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// POST /api/drivers  — create driver
router.post('/', async (req, res) => {
  const { name, license_number, phone_number, status, is_verified } = req.body;
  if (!name || !license_number) return res.status(400).json({ error: 'name and license_number required' });
  try {
    const q = `INSERT INTO drivers (name, license_number, phone_number, status, is_verified)
               VALUES ($1,$2,$3,$4,$5) RETURNING *`;
    const vals = [name, license_number, phone_number || null, status || 'active', !!is_verified];
    const { rows } = await pool.query(q, vals);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // unique_violation
      return res.status(409).json({ error: 'license_number already exists' });
    }
    res.status(500).json({ error: 'Database error' });
  }
});

// PUT /api/drivers/:id  — update driver
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, license_number, phone_number, status, is_verified } = req.body;
  try {
    const q = `UPDATE drivers SET
                name = COALESCE($1, name),
                license_number = COALESCE($2, license_number),
                phone_number = COALESCE($3, phone_number),
                status = COALESCE($4, status),
                is_verified = COALESCE($5, is_verified)
              WHERE driver_id = $6 RETURNING *`;
    const vals = [name, license_number, phone_number, status, is_verified, id];
    const { rows } = await pool.query(q, vals);
    if (!rows[0]) return res.status(404).json({ error: 'Driver not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE /api/drivers/:id
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    const { rowCount } = await pool.query('DELETE FROM drivers WHERE driver_id = $1', [id]);
    if (rowCount === 0) return res.status(404).json({ error: 'Driver not found' });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
