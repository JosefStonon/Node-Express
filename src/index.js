const express = require('express');

const route = require('./router');

const app = express();

app.use(express.json());
app.use(route);

app.listen(3001, () => console.log('🔥 Server has been started at http://localhost:3001'));
