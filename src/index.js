const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(router);

app.listen(3001, () => console.log('🔥 Server has been started at htpp://localhost:3001'));
