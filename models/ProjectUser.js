const Sequelize = require('sequelize');
const db = require('./index');

const ProjectUser = db.define(
  'ProjectUser',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_project: { type: Sequelize.INTEGER, allowNull: false },
    id_user: { type: Sequelize.INTEGER, allowNull: false },
  },
  { freezeTableName: true },
);

module.exports = ProjectUser;
