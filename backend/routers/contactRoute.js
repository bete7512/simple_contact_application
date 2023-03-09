const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.post('/', contactController.createContact);
router.get('/', contactController.getContacts);
// router.put('/:id', contactController.editContact);
// router.delete('/:id', contactController.deleteContact);

module.exports = router;