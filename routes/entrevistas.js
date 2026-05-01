const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrevistaController');

router.get('/', controller.getEntrevistas);
router.get('/:id', controller.getEntrevistaById);
router.post('/', controller.createEntrevista);
router.put('/:id', controller.updateEntrevista);
router.delete('/:id', controller.deleteEntrevista);

module.exports = router;