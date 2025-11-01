const express = require('express');
const router = express.Router();
const { Plan } = require('../models');

router.get('/', async (req, res) => {
  const plans = await Plan.findAll();
  res.json(plans);
});

router.post('/', async (req, res) => {
  const { name, price_cents, interval, description, userId } = req.body;
  const plan = await Plan.create({ name, price_cents, interval, description, userId });
  res.json(plan);
});

module.exports = router;
