const Sequelize = require('sequelize');
const db = require('./index');

const Team = db.define(
  'Team',
  {
    id_team: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING(100), allowNull: false },
    description: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  { freezeTableName: true },
);

module.exports = Team;
