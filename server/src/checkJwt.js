const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://max33.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "IuD3C7GiX32G2flLeZFLJwIEnhczci5g",
  issuer: `https://max33.eu.auth0.com/`,
  algorithms: ["RS256"]
});

module.exports = checkJwt;
