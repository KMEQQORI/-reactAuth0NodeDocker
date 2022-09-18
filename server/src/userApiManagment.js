var request = require("request");

const connectManagment = () => {
  var options = {
    method: "POST",
    url: "https://max33.eu.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body:
      '{"client_id":"CpaW0vr06VXYfB2X3YhyKCUyYwdXrhdx","client_secret":"xK1JUja5mVWtebZDXGTK3lXn6iwZwfpHesByu2z6W8diB0cdHJUH1bDPUOCxlhZc","audience":"https://max33.eu.auth0.com/api/v2/","grant_type":"client_credentials"}'
  };
  console.log("connectManagment");
  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body).access_token);
      } else {
        reject(error);
      }
    });
  });
};

const findAllUsers = token => {
  var options = {
    method: "GET",
    url: "https://max33.eu.auth0.com/api/v2/users",
    headers: {
      "content-type": "application/json",
      authorization: "Bearer " + token
    }
  };
  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error);
      }
    });
  });
};

module.exports = { connectManagment, findAllUsers };
