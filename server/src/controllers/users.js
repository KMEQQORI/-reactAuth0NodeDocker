var express = require("express");
var models = require("../../database/models");
var router = express.Router();
var { connectManagment, findAllUsers } = require("../userApiManagment.js");

router.get("/", async (req, res) => {
  try {
    const token = await connectManagment();
    const users = await findAllUsers(token);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

// Home page route.
router.get("/token", async (req, res) => {
  try {
    const token = await connectManagment();
    res.send(token);
  } catch (error) {
    console.log("e", error);
  }
});

module.exports = router;
