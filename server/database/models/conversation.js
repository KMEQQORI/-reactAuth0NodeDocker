'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    idUser1: DataTypes.TEXT,
    idUser2: DataTypes.TEXT
  }, {});
  Conversation.associate = function (models) {
    // associations can be defined here
    Conversation.hasMany(models.MsgTwoUsers, {
      foreignKey: "idConversation",
      as: "MsgTwoUsers",
      onDelete: "CASCADE"
    });
  };
  return Conversation;
};