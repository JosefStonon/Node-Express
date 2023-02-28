const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Ola mundo!');
});

app.listen(3001, () => console.log('🔥Server has been started at http://localhost:3001'));
