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
    team_name: { type: Sequelize.STRING(50), allowNull: false },
    team_description: {
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
