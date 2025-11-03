// backend/src/controllers/employeesController.js
const { Employee } = require('../models');

module.exports = {
  async list(req, res) {
    const items = await Employee.findAll();
    res.json(items);
  },

  async get(req, res) {
    const item = await Employee.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  },

  async create(req, res) {
    try {
      const { firstName, lastName, email, position } = req.body;
      const emp = await Employee.create({ firstName, lastName, email, position });
      res.status(201).json(emp);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    const item = await Employee.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    const updated = await item.update(req.body);
    res.json(updated);
  },

  async remove(req, res) {
    const item = await Employee.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    await item.destroy();
    res.status(204).send();
  }
};
