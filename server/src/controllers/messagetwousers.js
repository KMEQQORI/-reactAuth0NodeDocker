var express = require("express");
var models = require("../../database/models");
var router = express.Router();


router.get("/conversation/:id", async (req, res) => {
    const messagesTwoUsers = await models.MsgTwoUsers.findAll({
        where: {
            idConversation: req.params.id
        }
    });
    res.send(messagesTwoUsers);
});

router.post("/conversation/:id", async (req, res) => {
    const { contenu, idUser } = req.body;
    const messagesTwoUsers = await models.MsgTwoUsers.create({
        idConversation: req.params.id,
        contenu,
        idUser
    });
    res.status(200).send(messagesTwoUsers);
});

router.delete("/", async (req, res) => {
    await models.MsgTwoUsers.destroy({
        where: {},
        truncate: true
    });
    res.send(200);
});

module.exports = router;
