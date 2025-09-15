// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// health
app.get('/', (req, res) => res.send('Backend is running 🚀'));

// Routes
const driversRouter = require('./routes/drivers');
const passengersRouter = require('./routes/passengers');
const tripsRouter = require('./routes/trips');
const ownershipsRouter = require('./routes/ownerships');
const reportsRouter = require('./routes/reports');

app.use('/api/drivers', driversRouter);
app.use('/api/passengers', passengersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/ownerships', ownershipsRouter);
app.use('/api/reports', reportsRouter);

// catch-all
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
