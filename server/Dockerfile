FROM node:12.6.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY /server/package.json /app/package.json
COPY /server/database/config /app/config

RUN cat /app/package.json
#RUN npm install --silent
RUN npm install 

