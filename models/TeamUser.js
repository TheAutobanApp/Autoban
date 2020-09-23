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
      accepted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      id_inviter: { type: DataTypes.INTEGER, allowNull: true },
    },

    { freezeTableName: true },
  );
  return TeamUser;
};
