const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienciaController');

router.get('/', controller.getExperiencias);
router.get('/:id', controller.getExperienciaById);
router.post('/', controller.createExperiencia);
router.put('/:id', controller.updateExperiencia);
router.delete('/:id', controller.deleteExperiencia);

module.exports = router;