"use strict";
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      idUser: DataTypes.TEXT,
      idCategory: DataTypes.INTEGER,
      idProject: DataTypes.INTEGER,
      contenu: DataTypes.STRING,
      priority: DataTypes.INTEGER,
      difficulty: DataTypes.INTEGER,
      urgence: DataTypes.STRING,
      tags: DataTypes.TEXT

    },
    {}
  );
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Category, {
      foreignKey: "idCategory",
      as: "category"
    });
    Task.belongsTo(models.Project, {
      foreignKey: "idProject",
      as: "project"
    });
    Task.hasMany(models.Comment, {
      foreignKey: "idTask",
      as: "comments",
      onDelete: "CASCADE"
    });
  };
  return Task;
};
