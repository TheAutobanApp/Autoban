module.exports = function (sequelize, DataTypes) {
  var ProjectUser = sequelize.define(
    'ProjectUser',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_project: { type: DataTypes.INTEGER, allowNull: false },
      id_user: { type: DataTypes.INTEGER, allowNull: false },
    },
    { freezeTableName: true },
  );
  return ProjectUser;
};
