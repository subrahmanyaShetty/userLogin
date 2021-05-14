const winston = require('winston');
const express = require('express');
const app = express();
require('./startup/logging')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
  // const p=Promise.reject(new Error("Faileeed."));
  // p.then(()=>console.log("Done"));
//   throw new Error("Uncaught Exception ")

const port = process.env.PORT || 3000;
const server=app.listen(port, () => winston.log('info',`Listening on port ${port}...`));
module.exports=server;
