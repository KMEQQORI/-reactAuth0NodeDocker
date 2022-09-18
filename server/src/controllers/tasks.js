var express = require("express");
var models = require("../../database/models");
var router = express.Router();

// Home page route.
router.get("/:id", async (req, res) => {
  const tasks = await models.Task.findAll({
    where: {
      id: req.params.id
    }
  });
  res.send(tasks);
});

router.get("/category/:id", async (req, res) => {
  const tasks = await models.Task.findAll({
    where: {
      idCategory: req.params.id
    }
  });
  res.send(tasks);
});
router.post("/category/:id", async (req, res) => {
  const {
    contenu,
    priority,
    idCategory,
    difficulty,
    tags,
    idUser,
    idProject
  } = req.body;
  const tasks = await models.Task.create({
    idCategory,
    idUser,
    idProject,
    contenu,
    priority,
    difficulty,
    tags
  });
  res.status(200).send(tasks);
});
router.delete("/:id", async (req, res) => {
  await models.Task.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});
router.put("/:id", async (req, res) => {
  const {
    contenu,
    priority,
    idCategory,
    urgence,
    difficulty,
    tags,
    idUser,
    idProject
  } = req.body;
  const tasks = await models.Task.update(
    {
      contenu,
      priority,
      urgence,
      difficulty,
      tags,
      idUser,
      idProject,
      idCategory
    },
    {
      where: {
        id: req.params.id
      }
    }
  );
  res.status(200).send(tasks);
});
/*
router.delete("/cotegory/:id", async (req, res) => {
  await models.Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});*/
module.exports = router;
