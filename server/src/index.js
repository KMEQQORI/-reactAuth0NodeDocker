//import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
var fs = require("fs");
var https = require("https");
var privateKey = fs.readFileSync("sslcert/server.key", "utf8");
var certificate = fs.readFileSync("sslcert/server.cert", "utf8");
const { Sequelize } = require("sequelize");
var models = require("../database/models");
var credentials = { key: privateKey, cert: certificate };
var projectsController = require("./controllers/projects.js");
var tasksController = require("./controllers/tasks.js");
var categoriesController = require("./controllers/categories.js");
var commentsController = require("./controllers/comments.js");
var notificationsController = require("./controllers/notifications.js");
var contributionsController = require("./controllers/contributions.js");
var messagesController = require("./controllers/messages.js");
var tagsController = require("./controllers/tags.js");
var usersController = require("./controllers/users.js");
var checkJwt = require("./checkJwt.js");
var conversation = require("./controllers/conversation");
var messagesTwoUsers = require("./controllers/messagetwousers");

// define the Express app
const app = express();
// enhance your app security with Helmet
app.use(helmet());
// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
// enable all CORS requests
app.use(cors());
// log HTTP requests
app.use(morgan("combined"));

// Install Sequelize init
const sequelize = new Sequelize("postgres://admin:admin@postgres:5432/maxdb");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// Add Controllers
app.use("/message", messagesController);
app.use("/project", projectsController);
app.use("/task", tasksController);
app.use("/notification", notificationsController);
app.use("/comment", commentsController);
app.use("/category", categoriesController);
app.use("/tag", tagsController);
app.use("/user", usersController);
app.use("/conversation", conversation);
app.use("/messagetwousers", messagesTwoUsers);
app.use("/contribution", contributionsController);

// get a specific question
app.get("/question/:id", async (req, res) => {
  const question = await models.Question.findOne({
    where: { id: req.params.id },
    include: [{ model: models.Answer, as: "answers" }]
  });
  res.send(question);
});

// insert a new question
app.post("/", checkJwt, async (req, res) => {
  const { title, description } = req.body;
  const question = await models.Question.create({
    title,
    description,
    author: req.user
  });

  res.status(200).send();
});

// insert a new answer to a question
app.post("/answer/:id", checkJwt, async (req, res) => {
  const { answer } = req.body;

  const answerAdded = await models.Answer.create({
    contenu: answer,
    questionId: req.params.id
  });

  res.status(200).send(answerAdded);
});

var httpsServer = https.createServer(credentials, app);

// start the server
httpsServer.listen(3000, () => {
  console.log("listening on port 3000");
});
