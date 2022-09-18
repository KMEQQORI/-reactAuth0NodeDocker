var express = require("express");
var models = require("../../database/models");
var router = express.Router();

router.get("/max/:id", async (req, res) => {
  const messagesMAX = await models.Message.findOne({
    order: [["id", "DESC"]]
  });
  res.send(messagesMAX);
});

router.get("/", async (req, res) => {
  const messages = await models.Message.findAll();
  res.send(messages);
});

router.post("/", async (req, res) => {
  const { contenu, idUser, idProject } = req.body;
  const messages = await models.Message.create({
    contenu,
    idProject,
    idUser
  });
  res.status(200).send(messages);
});

router.delete("/:id", async (req, res) => {
  await models.Message.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});

module.exports = router;
