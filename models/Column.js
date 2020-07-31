const Sequelize = require('sequelize');
const db = require('./index');

const Column = db.define(
  'Column',
  {
    id_column: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_project: { type: Sequelize.INTEGER, allowNull: false },
    id_place: { type: Sequelize.INTEGER, allowNull: false },
    Column_name: { type: Sequelize.STRING(50), allowNull: false },
    Column_description: Sequelize.STRING(200),
  },
  { freezeTableName: true },
);

module.exports = Column;
