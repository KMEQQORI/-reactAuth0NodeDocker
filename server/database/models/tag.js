'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    contenu: DataTypes.STRING,
    color: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {});
  Tag.associate = function (models) {
    // associations can be defined here
  };
  return Tag;
};