module.exports = function (sequelize, DataTypes) {
  var TeamUser = sequelize.define(
    'TeamUser',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_team: { type: DataTypes.INTEGER, allowNull: false },
      id_user: { type: DataTypes.INTEGER, allowNull: false },
    },

    { freezeTableName: true },
  );
  return TeamUser;
};
