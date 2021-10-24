const express = require('express');
const app = require('./app');

const server = express();

const {PORT}  = process.env;
const port = process.env.PORT || PORT;
server.listen(port,console.log("Server Started at http://localhost:"+port))

