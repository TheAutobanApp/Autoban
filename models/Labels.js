const Sequelize = require('sequelize');
const db = require('./index');

const Label = db.define(
  'Label',
  {
    id_label: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_project: { type: Sequelize.INTEGER, allowNull: false },
    id_user: { type: Sequelize.INTEGER, allowNull: false },
    color: { type: Sequelize.STRING(50), allowNull: false },
    label_name: { type: Sequelize.STRING(50), allowNull: false },
  },
  { freezeTableName: true },
);

module.exports = Label;
