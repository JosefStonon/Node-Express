const express = require('express');
const router = require('./router');

const app = express();

app.use(router);

app.listen(3001, () => console.log('🔥 Server has benn started at http://localhost:3001'));
