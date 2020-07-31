const Sequelize = require('sequelize');
const db = require('./index');

const Project = db.define(
  'Project',
  {
    id_project: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_team: { type: Sequelize.INTEGER, allowNull: false },
    project_name: { type: Sequelize.STRING(50), allowNull: false },
    project_description: Sequelize.STRING(200),

    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    automation_order: { type: Sequelize.INTEGER, allowNull: false },
    created_by: { type: Sequelize.INTEGER, allowNull: false },
  },
  { freezeTableName: true },
);

module.exports = Project;
