const Sequelize = require('sequelize');
const db = require('./index');

const TeamUser = db.define(
  'TeamUser',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_team: { type: Sequelize.INTEGER, allowNull: false },
    id_user: { type: Sequelize.INTEGER, allowNull: false },
  },

  { freezeTableName: true },
);

module.exports = TeamUser;
