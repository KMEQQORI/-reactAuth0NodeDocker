var express = require("express");
var models = require("../../database/models");
var router = express.Router();
var checkJwt = require("../checkJwt.js");
var _ = require("lodash");

router.get("/", checkJwt, async (req, res) => {
  const contributions = await models.Contribution.findAll();
  var totalInvestement = 0;
  contributions.forEach(
    contribution => (totalInvestement = totalInvestement + contribution.amount)
  );
  const groupedContributions = _.groupBy(contributions, contribution => {
    return JSON.parse(contribution.idUser).email;
  });
  console.log(totalInvestement);
  const rawStats = Object.values(groupedContributions).map(
    userContributions => {
      const idUser = userContributions[0].idUser;
      var totalAmount = 0;
      userContributions.forEach(
        userContribution =>
          (totalAmount = totalAmount + userContribution.amount)
      );
      return {
        idUser,
        totalAmount,
        percent: ((totalAmount / totalInvestement) * 100).toFixed(2)
      };
    }
  );

  const stats = rawStats.sort((a, b) => Number(a.percent) - Number(b.percent));

  res.send({ contributions, stats, groupedContributions });
});

router.post("/", checkJwt, async (req, res) => {
  const { type, amount, idUser } = req.body;
  const contribution = await models.Contribution.create({
    idUser: JSON.stringify(idUser),
    type,
    amount
  });
  res.status(200).send(contribution);
});

router.put("/:id", checkJwt, async (req, res) => {
  const { amount, type } = req.body;
  const contribution = await models.Contribution.update(
    {
      type,
      amount
    },
    { where: { id: req.params.id } }
  );

  res.status(200).send(contribution);
});

router.delete("/:id", checkJwt, async (req, res) => {
  await models.Contribution.destroy({
    where: {
      id: req.params.id
    }
  });
  res.send(200);
});

module.exports = router;
