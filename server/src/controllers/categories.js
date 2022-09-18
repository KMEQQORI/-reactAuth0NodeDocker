var express = require("express");
var models = require("../../database/models");
var router = express.Router();

// Home page route.
router.get("/:id", async (req, res) => {
  const categories = await models.Category.findAll({
    where: {
      id: req.params.id
    },
    include: [{ model: models.Task, as: "tasks" }]
  });
  res.send(categories);
});
router.get("/project/:id", async (req, res) => {
  const categories = await models.Category.findAll({
    order: [["position", "ASC"]],
    where: {
      idProject: req.params.id
    },
    include: [
      {
        model: models.Task,
        as: "tasks",
        include: [{ model: models.Comment, as: "comments" }]
      }
    ]
  });
  res.send(categories);
});
router.post("/project/:id", async (req, res) => {
  const { title, position } = req.body;
  const category = await models.Category.create({
    idProject: req.params.id,
    title,
    position
  });
  res.status(200).send(category);
});
router.delete("/:id", async (req, res) => {
  await models.Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});
router.put("/:id", async (req, res) => {
  const { title, position } = req.body;
  const category = await models.Category.update(
    {
      title,
      position
    },
    {
      where: {
        id: req.params.id
      }
    }
  );
  res.status(200).send(category);
});
module.exports = router;
