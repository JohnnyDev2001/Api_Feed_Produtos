const express = require("express");
const router = require("./router");
require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(express.json());
app.use(router);

app.listen(port);