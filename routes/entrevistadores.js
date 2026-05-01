const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrevistadorController');

router.get('/', controller.getEntrevistadores);
router.get('/:id', controller.getEntrevistadorById);
router.post('/', controller.createEntrevistador);
router.put('/:id', controller.updateEntrevistador);
router.delete('/:id', controller.deleteEntrevistador);

module.exports = router;