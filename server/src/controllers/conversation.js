var express = require("express");
var models = require("../../database/models");
var router = express.Router();


router.get("/:id", async (req, res) => {
    const conversation = await models.Conversation.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: models.MsgTwoUsers, as: "MsgTwoUsers" },
        ]
    });
    res.send(conversation);
});

router.get("/", async (req, res) => {
    const conversation = await models.Conversation.findAll();
    res.send(conversation);
});

router.post("/", async (req, res) => {
    const { idUser1, idUser2 } = req.body;
    const conversation = await models.Conversation.create({
        idUser1,
        idUser2
    });
    res.status(200).send(conversation);
});

router.delete("/:id", async (req, res) => {
    await models.Conversation.destroy({
        where: {
            id: req.params.id
        }
    });
    res.send(200);
});

router.delete("/", async (req, res) => {
    await models.Conversation.destroy({
        where: {},
        truncate: true
    });
    res.send(200);
});

module.exports = router;
