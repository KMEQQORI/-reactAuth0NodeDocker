"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      idProject: DataTypes.INTEGER,
      title: DataTypes.STRING,
      position: DataTypes.INTEGER
    },
    {}
  );
  Category.associate = function(models) {
    // associations can be defined here
    Category.belongsTo(models.Project, {
      foreignKey: "idProject",
      as: "project"
    });
    Category.hasMany(models.Task, {
      foreignKey: "idCategory",
      as: "tasks",
      onDelete: "CASCADE"
    });
  };
  return Category;
};
