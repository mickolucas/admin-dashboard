const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/ownerships
router.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(`
      SELECT o.*, d.name AS driver_name, d.license_number
      FROM ownerships o
      JOIN drivers d ON d.driver_id = o.driver_id
      ORDER BY o.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Query error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  } finally {
    client.release();
  }
});

// POST /api/ownerships/:id/payments
router.post('/:id/payments', async (req, res) => {
  const ownershipId = Number(req.params.id);
  const { amount } = req.body;

  // Input validation
  if (isNaN(ownershipId) || ownershipId <= 0) {
    return res.status(400).json({ error: 'Invalid ownership ID' });
  }
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Check if ownership exists
    const checkOwnership = await client.query(
      'SELECT ownership_id FROM ownerships WHERE ownership_id = $1',
      [ownershipId]
    );

    if (checkOwnership.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Ownership not found' });
    }

    const insert = await client.query(
      'INSERT INTO repayments (ownership_id, amount) VALUES ($1,$2) RETURNING *',
      [ownershipId, amount]
    );

    const upd = await client.query(
      `UPDATE ownerships
       SET amortization_paid = amortization_paid + $1
       WHERE ownership_id = $2
       RETURNING amortization_total, amortization_paid`,
      [amount, ownershipId]
    );

    if (Number(upd.rows[0].amortization_paid) >= Number(upd.rows[0].amortization_total)) {
      await client.query(
        'UPDATE ownerships SET ownership_status = $1 WHERE ownership_id = $2',
        ['fully_owned', ownershipId]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({
      payment: insert.rows[0],
      status: {
        paid: upd.rows[0].amortization_paid,
        total: upd.rows[0].amortization_total
      }
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Transaction error:', err);
    res.status(500).json({ error: 'Transaction failed', detail: err.message });
  } finally {
    client.release();
  }
});

// POST /api/ownerships
router.post('/', async (req, res) => {
  const { driver_id, amortization_total } = req.body;
  
  // Input validation
  if (!driver_id || isNaN(driver_id) || driver_id <= 0) {
    return res.status(400).json({ error: 'Valid driver_id is required' });
  }
  if (!amortization_total || isNaN(amortization_total) || amortization_total <= 0) {
    return res.status(400).json({ error: 'Valid amortization_total is required' });
  }

  const client = await pool.connect();
  try {
    // Check if driver exists
    const driverCheck = await client.query(
      'SELECT driver_id FROM drivers WHERE driver_id = $1',
      [driver_id]
    );

    if (driverCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const { rows } = await client.query(`
      INSERT INTO ownerships (
        driver_id, 
        amortization_total, 
        amortization_paid, 
        ownership_status
      )
      VALUES ($1, $2, 0, 'in_progress')
      RETURNING *
    `, [driver_id, amortization_total]);

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Failed to create ownership', detail: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;