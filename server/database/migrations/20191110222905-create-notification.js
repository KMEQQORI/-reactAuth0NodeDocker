"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idUsersTransmitter: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      idUsersReceiver: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isUsersToNotify: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      contentType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idContent: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Notifications");
  }
};
