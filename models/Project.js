module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define(
    'Project',
    {
      id_project: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_team: { type: DataTypes.INTEGER, allowNull: false },
      project_name: { type: DataTypes.STRING(50), allowNull: false },
      project_description: DataTypes.STRING(200),

      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
    },
    { freezeTableName: true },
  );
  return Project;
};
