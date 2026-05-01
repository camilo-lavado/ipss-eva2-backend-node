const express = require('express');
const router = express.Router();
const controller = require('../controllers/cargoController');

router.get('/', controller.getCargos);
router.get('/:id', controller.getCargoById);
router.post('/', controller.createCargo);
router.put('/:id', controller.updateCargo);
router.delete('/:id', controller.deleteCargo);

module.exports = router;