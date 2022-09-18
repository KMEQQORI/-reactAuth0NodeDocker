var express = require("express");
var models = require("../../database/models");
var router = express.Router();

// Home page route.
router.get("/", async (req, res) => {
  const notifications = await models.Notification.findAll();
  res.send(notifications);
});

router.get("/:id", async (req, res) => {
  const notifications = await models.Notification.findOne({
    where: { id: req.params.id }
  });
  res.send(notifications);
});

// Get notification of a specific Content (ex: commentTask, moveTask, deletTask...).
router.get("/:contentType/:idContent", async (req, res) => {
  const notifications = await models.Notification.findOne({
    where: {
      contentType: req.params.contentType,
      idContent: req.params.idContent
    }
  });
  res.send(notifications);
});
// Updat a notification
router.put("/:id", async (req, res) => {
  const {
    idUsersTransmitter,
    idUsersReceiver,
    isUsersToNotify,
    contentType,
    idContent,
    message
  } = req.body;
  const notifications = await models.Notification.update(
    {
      idUsersTransmitter,
      idUsersReceiver,
      isUsersToNotify,
      contentType,
      idContent,
      message
    },
    {
      where: {
        id: req.params.id
      }
    }
  );
  res.status(200).send(notifications);
});




router.delete("/:id", async (req, res) => {
  await models.Notification.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});

router.post("/", async (req, res) => {
  const { idUsersTransmitter, idUsersReceiver, isUsersToNotify, contentType, idContent, message } = req.body;
  const notification = await models.Notification.create({
    idUsersTransmitter,
    idUsersReceiver,
    isUsersToNotify,
    contentType,
    idContent,
    message
  });
  res.status(200).send(notification);
});

module.exports = router;
