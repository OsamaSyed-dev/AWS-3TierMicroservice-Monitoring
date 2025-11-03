// backend/src/models/index.js
const { Sequelize } = require('sequelize');
const env = process.env;

const sequelize = new Sequelize(env.DB_NAME || 'employeesdb', env.DB_USER || 'postgres', env.DB_PASS || 'postgres', {
  host: env.DB_HOST || 'db',
  dialect: 'postgres',
  logging: false,
});

const Employee = require('./employee')(sequelize);

module.exports = { sequelize, Employee };
