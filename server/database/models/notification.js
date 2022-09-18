'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    idUsersTransmitter: DataTypes.TEXT,
    idUsersReceiver: DataTypes.TEXT,
    isUsersToNotify: DataTypes.TEXT,
    contentType: DataTypes.STRING,
    idContent: DataTypes.INTEGER,
    message: DataTypes.TEXT,
  }, {});
  Notification.associate = function (models) {
    // associations can be defined here
  };
  return Notification;
};