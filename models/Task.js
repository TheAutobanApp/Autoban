module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define(
    'Task',
    {
      id_task: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_user: { type: DataTypes.INTEGER, allowNull: false },
      id_project: { type: DataTypes.INTEGER, allowNull: false },
      id_column: { type: DataTypes.INTEGER, allowNull: false },
      column_place: { type: DataTypes.INTEGER, allowNull: false },
      task_title: { type: DataTypes.STRING(50), allowNull: false },
      task_description: DataTypes.STRING(200),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      id_label1: { type: DataTypes.INTEGER, allowNull: true },
      id_label2: { type: DataTypes.INTEGER, allowNull: true },
      id_label3: { type: DataTypes.INTEGER, allowNull: true },
      complete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
    },
    { freezeTableName: true },
  );
  return Task;
};
