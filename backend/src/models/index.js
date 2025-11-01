const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL || 'mysql://root:root@localhost:3306/subsync');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password_hash: DataTypes.STRING,
  role: { type: DataTypes.ENUM('user','admin'), defaultValue: 'user' }
});

const Customer = sequelize.define('Customer', { name: DataTypes.STRING, email: DataTypes.STRING, phone: DataTypes.STRING, notes: DataTypes.TEXT });
const Plan = sequelize.define('Plan', { name: DataTypes.STRING, price_cents: DataTypes.INTEGER, interval: DataTypes.ENUM('month','year'), description: DataTypes.TEXT });
const Subscription = sequelize.define('Subscription', { status: DataTypes.ENUM('active','paused','cancelled','past_due'), started_at: DataTypes.DATEONLY, next_billing_date: DataTypes.DATEONLY, stripe_subscription_id: DataTypes.STRING });
const Payment = sequelize.define('Payment', { amount_cents: DataTypes.INTEGER, currency: DataTypes.STRING, status: DataTypes.ENUM('pending','paid','failed'), paid_at: DataTypes.DATE });

User.hasMany(Customer, { foreignKey: 'userId' });
User.hasMany(Plan, { foreignKey: 'userId' });
Customer.belongsTo(User, { foreignKey: 'userId' });
Plan.belongsTo(User, { foreignKey: 'userId' });

Customer.hasMany(Subscription, { foreignKey: 'customerId' });
Plan.hasMany(Subscription, { foreignKey: 'planId' });
Subscription.belongsTo(Customer, { foreignKey: 'customerId' });
Subscription.belongsTo(Plan, { foreignKey: 'planId' });

Subscription.hasMany(Payment, { foreignKey: 'subscriptionId' });
Payment.belongsTo(Subscription, { foreignKey: 'subscriptionId' });

module.exports = { sequelize, User, Customer, Plan, Subscription, Payment };
