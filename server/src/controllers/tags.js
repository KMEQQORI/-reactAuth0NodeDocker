var express = require("express");
var models = require("../../database/models");
var router = express.Router();


router.get("/", async (req, res) => {
    const tag = await models.Tag.findAll();
    res.send(tag);
});

router.get("/:id", async (req, res) => {
    const tag = await models.Tag.findAll({
        where: {
            id: req.params.id
        },
    });
    res.send(tag);
});

router.post("/", async (req, res) => {
    const { contenu, color, icon } = req.body;
    const tag = await models.Tag.create({
        contenu,
        color,
        icon
    });
    res.status(200).send(tag);
});

router.delete("/:id", async (req, res) => {
    await models.Tag.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send(200);
});

module.exports = router;
