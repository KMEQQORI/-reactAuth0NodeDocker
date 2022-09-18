"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      idUser: DataTypes.TEXT,
      idTask: DataTypes.INTEGER,
      contenu: DataTypes.STRING
    },
    {}
  );
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Task, {
      foreignKey: "idTask",
      as: "task"
    });
  };
  return Comment;
};
