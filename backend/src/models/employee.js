// backend/src/models/employee.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    position: { type: DataTypes.STRING, allowNull: true }
  }, {
    tableName: 'employees',
    timestamps: true,
  });

  return Employee;
};
