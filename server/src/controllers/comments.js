var express = require("express");
var models = require("../../database/models");
var router = express.Router();
var checkJwt = require("../checkJwt.js");

// Home page route.
router.get("/task/:id", async (req, res) => {
  const comments = await models.Comment.findAll({
    where: { idTask: req.params.id }
  });
  res.send(comments);
});

router.post("/task/:id", async (req, res) => {
  const { contenu, idUser } = req.body;
  const comment = await models.Comment.create({
    idTask: req.params.id,
    idUser: JSON.stringify(idUser),
    contenu
  });
  res.status(200).send(comment);
});

router.put("/:id", checkJwt, async (req, res) => {
  const { contenu } = req.body;
  const comment = await models.Comment.update(
    {
      contenu,
      IdUser: JSON.stringify(req.user)
    },
    { where: { id: req.params.id } }
  );

  res.status(200).send(comment);
});

router.delete("/:id", checkJwt, async (req, res) => {
  await models.Comment.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});

router.delete("/task/:id", checkJwt, async (req, res) => {
  await models.Comment.destroy({
    where: {
      taskId: req.params.id
    }
  });
  res.send(200);
});

module.exports = router;
