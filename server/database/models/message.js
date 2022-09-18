"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      idUser: DataTypes.TEXT,
      contenu: DataTypes.TEXT,
      idProject: DataTypes.INTEGER
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.Project, {
      foreignKey: "idProject",
      as: "project"
    });
  };
  return Message;
};
