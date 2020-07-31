const Sequelize = require('sequelize');
const db = require('./index');

const Task = db.define(
  'Task',
  {
    id_task: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: { type: Sequelize.INTEGER, allowNull: false },
    id_project: { type: Sequelize.INTEGER, allowNull: false },
    id_column: { type: Sequelize.INTEGER, allowNull: false },
    column_place: { type: Sequelize.INTEGER, allowNull: false },
    task_title: { type: Sequelize.STRING(50), allowNull: false },
    task_description: Sequelize.STRING(200),
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    id_label1: { type: Sequelize.INTEGER, allowNull: false },
    id_label2: { type: Sequelize.INTEGER, allowNull: false },
    id_label3: { type: Sequelize.INTEGER, allowNull: false },
    complete: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    created_by: { type: Sequelize.INTEGER, allowNull: false },
  },
  { freezeTableName: true },
);

module.exports = Task;
