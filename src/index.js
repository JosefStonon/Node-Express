const express = require('express');

const routes = require('./router');

const app = express();

app.use(routes);

app.listen(3001, () => console.log('🔥Server has been started at http://localhost:3001'));
