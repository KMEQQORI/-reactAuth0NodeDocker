#!/bin/sh
echo start
npm  install --silent
echo install done
npx sequelize db:migrate
echo migration done
node ./src