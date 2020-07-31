const Sequelize = require('sequelize');
const db = require('./index');

const User = db.define(
  'User',
  {
    id_user: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_project: { type: Sequelize.INTEGER, allowNull: false },
    first_name: { type: Sequelize.STRING(50), allowNull: false },
    last_name: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(50), allowNull: false },
    username: { type: Sequelize.STRING(50), allowNull: false },
    password: { type: Sequelize.STRING(100), allowNull: false },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { freezeTableName: true },
);

module.exports = User;
