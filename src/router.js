const { Router } = require('express');
const ContactController = require('./app/Controllers/ContactController');

const router = Router();

router.get('/contact', ContactController.index);
router.get('/contact/:id', ContactController.show);
router.post('/contact', ContactController.store);
router.put('/contact/:id', ContactController.update);
router.delete('/contact/:id', ContactController.delete);

module.exports = router;
