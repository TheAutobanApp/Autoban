module.exports = function (sequelize, DataTypes) {
  var Label = sequelize.define(
    'Label',
    {
      id_label: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_project: { type: DataTypes.INTEGER },
      color: { type: DataTypes.STRING(50), allowNull: false },
      label_name: { type: DataTypes.STRING(50), allowNull: false },
    },
    { freezeTableName: true },
  );
  return Label;
};
