// backend/routes/trips.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/trips
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT t.*, p.name AS passenger_name, d.name AS driver_name
      FROM trips t
      LEFT JOIN passengers p ON p.passenger_id = t.passenger_id
      LEFT JOIN drivers d ON d.driver_id = t.driver_id
      ORDER BY t.requested_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// POST /api/trips  — create trip request
router.post('/', async (req, res) => {
  const { passenger_id, pickup_address, dropoff_address, distance_km, fare, payment_method } = req.body;
  try {
    const q = `
      INSERT INTO trips (passenger_id, pickup_address, dropoff_address, distance_km, fare, payment_method)
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
    const vals = [passenger_id || null, pickup_address || null, dropoff_address || null, distance_km || null, fare || null, payment_method || 'cash'];
    const { rows } = await pool.query(q, vals);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// PUT /api/trips/:id  — update status/assign driver/etc.
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { driver_id, status, assigned_at, pickup_at, dropoff_at } = req.body;
  try {
    const q = `
      UPDATE trips SET
        driver_id = COALESCE($1, driver_id),
        status = COALESCE($2, status),
        assigned_at = COALESCE($3, assigned_at),
        pickup_at = COALESCE($4, pickup_at),
        dropoff_at = COALESCE($5, dropoff_at)
      WHERE trip_id = $6 RETURNING *
    `;
    const vals = [driver_id, status, assigned_at, pickup_at, dropoff_at, id];
    const { rows } = await pool.query(q, vals);
    if (!rows[0]) return res.status(404).json({ error: 'Trip not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
