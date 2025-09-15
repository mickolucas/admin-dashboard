// backend/routes/reports.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/reports/rides-per-day
router.get('/rides-per-day', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT DATE(requested_at) AS day, COUNT(*)::int AS rides
      FROM trips
      GROUP BY day
      ORDER BY day DESC
      LIMIT 30
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /api/reports/repayments-total
router.get('/repayments-total', async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT COALESCE(SUM(amount),0)::numeric(12,2) AS total_repayments FROM repayments`);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// GET /api/reports/summary  (combined)
router.get('/summary', async (req, res) => {
  try {
    const ridesRes = await pool.query(`
      SELECT COUNT(*)::int AS rides_total FROM trips
    `);
    const repaymentsRes = await pool.query(`SELECT COALESCE(SUM(amount),0)::numeric(12,2) AS repayments_total FROM repayments`);
    res.json({
      rides_total: ridesRes.rows[0].rides_total,
      repayments_total: repaymentsRes.rows[0].repayments_total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
