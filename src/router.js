const { Router } = require('express');
const ContactController = require('./app/Controllers/ContactController');

const router = Router();

router.get('/contact', ContactController.index);
router.get('/contact/:id', ContactController.show);
router.delete('/contact/:id', ContactController.delete);
router.post('/contact', ContactController.store);
router.put('/contact/:id', ContactController.update);

module.exports = router;
