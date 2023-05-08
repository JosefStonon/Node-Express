const express = require('express');
require('express-async-errors');

const cors = require('./app/middlewares/cors')
const errorHandler = require('./app/middlewares/errorHandler')
const route = require('./router');

const app = express();

app.use(express.json());
app.use(cors)
app.use(route);
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Server has been started at http://localhost:3001'));
