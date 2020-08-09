module.exports = function (sequelize, DataTypes) {
  const Team = sequelize.define(
    'Team',
    {
      id_team: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      team_name: { type: DataTypes.STRING(50), allowNull: false },
      team_description: {
        type: DataTypes.STRING(200),
      },
      team_color: { type: DataTypes.STRING(20), allowNull: false},
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { freezeTableName: true },
  );
  return Team;
};
