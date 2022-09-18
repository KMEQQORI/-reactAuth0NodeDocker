var express = require("express");
var models = require("../../database/models");
var checkJwt = require("../checkJwt.js");
var router = express.Router();

// Home page route.
router.get("/", async (req, res) => {
  const projects = await models.Project.findAll({
    include: [
      { model: models.Category, as: "categories" },
      { model: models.Task, as: "tasks" }
    ]
  });
  res.send(projects);
});

router.get("/:id", async (req, res) => {
  const project = await models.Project.findOne({
    where: { id: req.params.id },
    include: [
      { model: models.Category, as: "categories" },
      { model: models.Task, as: "tasks" }
    ]
  });
  res.send(project);
});

router.post("/", async (req, res) => {
  const { title, Description } = req.body;
  const project = await models.Project.create({
    title,
    Description
  });
  res.status(200).send(project);
});

router.delete("/:id", async (req, res) => {
  await models.Project.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});

router.put("/:id", async (req, res) => {
  const { title, Description } = req.body;
  const project = await models.Project.update(
    {
      title,
      Description
    },
    { where: { id: req.params.id } }
  );

  res.status(200).send(project);
});

module.exports = router;
