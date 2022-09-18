require("dotenv").config();

const environmentVariablesConfig = {
  username: process.env.DB_USERNAME || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "maxdb",
  host: process.env.DB_HOST || "postgres",
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
  seederStorage: "sequelize",
  logging: false
};

function printConfig() {
  console.log("DB_USERNAME: " + environmentVariablesConfig.username);
  console.log("DB_PASSWORD: " + environmentVariablesConfig.password);
  console.log("DB_NAME: " + environmentVariablesConfig.database);
  console.log("DB_HOST: " + environmentVariablesConfig.host);
  console.log("DB_PORT: " + environmentVariablesConfig.port);
  console.log("DB_DIALECT: " + environmentVariablesConfig.dialect);
}

printConfig();

module.exports = {
  development: environmentVariablesConfig,
  test: environmentVariablesConfig,
  production: environmentVariablesConfig
};
