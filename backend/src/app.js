// backend/src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const employeeRoutes = require('./routes/employees');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', service: 'employee-backend' }));
app.use('/api/employees', employeeRoutes);

// Health endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

module.exports = app;
