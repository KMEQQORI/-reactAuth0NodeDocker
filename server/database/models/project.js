"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      title: DataTypes.STRING,
      Description: DataTypes.STRING
    },
    {}
  );
  Project.associate = function(models) {
    // associations can be defined here
    Project.hasMany(models.Task, {
      foreignKey: "idProject",
      as: "tasks",
      onDelete: "CASCADE"
    });
    Project.hasMany(models.Category, {
      foreignKey: "idProject",
      as: "categories",
      onDelete: "CASCADE"
    });
    Project.hasMany(models.Message, {
      foreignKey: "idProject",
      as: "messages",
      onDelete: "CASCADE"
    });
  };
  return Project;
};
