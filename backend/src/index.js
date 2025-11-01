require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const plansRoutes = require('./routes/plans');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);

const PORT = process.env.PORT || 4000;

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error', err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
