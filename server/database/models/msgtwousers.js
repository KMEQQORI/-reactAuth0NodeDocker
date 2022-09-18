'use strict';
module.exports = (sequelize, DataTypes) => {
  const MsgTwoUsers = sequelize.define('MsgTwoUsers', {
    idConversation: DataTypes.INTEGER,
    contenu: DataTypes.TEXT,
    idUser: DataTypes.TEXT
  }, {});
  MsgTwoUsers.associate = function (models) {
    // associations can be defined here
    MsgTwoUsers.belongsTo(models.Conversation, {
      foreignKey: "idConversation",
      as: "Conversation"
    });
  };
  return MsgTwoUsers;
};