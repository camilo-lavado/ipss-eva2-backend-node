const express = require('express');
const router = express.Router();
const controller = require('../controllers/candidatoController');

router.get('/', controller.getCandidatos);
router.get('/:id', controller.getCandidatoById);
router.post('/', controller.createCandidato);
router.put('/:id', controller.updateCandidato);
router.delete('/:id', controller.deleteCandidato);

module.exports = router;