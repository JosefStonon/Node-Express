const express = require('express');
require('express-async-errors');

const route = require('./router');

const app = express();

app.use(express.json());
app.use(route);
app.use((error, req, res, next) => {
  console.log('##### Error Handler');
  console.log(error);
  res.sendStatus(500);
});

app.listen(3001, () => console.log('🔥 Server has been started at http://localhost:3001'));
