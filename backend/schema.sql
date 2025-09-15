-- backend/schema.sql

-- Drivers
CREATE TABLE IF NOT EXISTS drivers (
  driver_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  license_number VARCHAR(50) UNIQUE NOT NULL,
  phone_number VARCHAR(20),
  status VARCHAR(20) DEFAULT 'active',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Passengers
CREATE TABLE IF NOT EXISTS passengers (
  passenger_id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20),
  email VARCHAR(150),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Ownerships (amortization / ownership plan)
CREATE TABLE IF NOT EXISTS ownerships (
  ownership_id SERIAL PRIMARY KEY,
  driver_id INTEGER UNIQUE REFERENCES drivers(driver_id) ON DELETE CASCADE,
  amortization_total NUMERIC(12,2) NOT NULL DEFAULT 0,
  amortization_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
  ownership_status VARCHAR(20) DEFAULT 'in_progress', -- in_progress | fully_owned
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Repayments log (payments toward ownerships)
CREATE TABLE IF NOT EXISTS repayments (
  repayment_id  SERIAL PRIMARY KEY,
  ownership_id   INTEGER REFERENCES ownerships(ownership_id) ON DELETE CASCADE,
  amount         NUMERIC(12,2) NOT NULL,
  paid_at        TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trips
CREATE TABLE IF NOT EXISTS trips (
  trip_id SERIAL PRIMARY KEY,
  passenger_id INTEGER REFERENCES passengers(passenger_id) ON DELETE SET NULL,
  driver_id INTEGER REFERENCES drivers(driver_id) ON DELETE SET NULL,
  pickup_address TEXT,
  dropoff_address TEXT,
  distance_km NUMERIC(8,2),
  fare NUMERIC(12,2),
  payment_method VARCHAR(30) DEFAULT 'cash',
  status VARCHAR(30) DEFAULT 'requested', -- requested | assigned | in_progress | completed | cancelled
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  assigned_at TIMESTAMP WITH TIME ZONE,
  pickup_at TIMESTAMP WITH TIME ZONE,
  dropoff_at TIMESTAMP WITH TIME ZONE
);

-- Useful indices
CREATE INDEX IF NOT EXISTS idx_trips_requested_at ON trips (requested_at);
CREATE INDEX IF NOT EXISTS idx_trips_driver_id ON trips (driver_id);
