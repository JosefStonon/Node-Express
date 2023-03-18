const { Router } = require('express');

const ContactController = require('./app/Controllers/ContactController');
const CategoryController = require('./app/Controllers/CategoryController');

const route = Router();

route.get('/contact', ContactController.index);
route.get('/contact/:id', ContactController.show);
route.post('/contact', ContactController.store);
route.put('/contact/:id', ContactController.update);
route.delete('/contact/:id', ContactController.delete);

route.get('/category', CategoryController.index);
route.get('/category/:id', CategoryController.show);
route.post('/category', CategoryController.store);
route.put('/category/:id', CategoryController.update);
route.delete('/category/:id', CategoryController.delete);

module.exports = route;
