"use strict";
module.exports = (sequelize, DataTypes) => {
  const Contribution = sequelize.define(
    "Contribution",
    {
      idUser: DataTypes.TEXT,
      type: DataTypes.TEXT,
      amount: DataTypes.INTEGER
    },
    {}
  );
  Contribution.associate = function(models) {
    // associations can be defined here
  };
  return Contribution;
};
