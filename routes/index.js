const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarios');
const candidatosRoutes = require('./candidatos');
const cargosRoutes = require('./cargos');
const entrevistadoresRoutes = require('./entrevistadores');
const entrevistasRoutes = require('./entrevistas');
const experienciasRoutes = require('./experiencias');

router.get('/health', (req, res) => {
    res.status(200).json({
        status: "online",
        version: "1.0.0",
        environment: "development"
    });
});

router.use('/usuarios', usuariosRoutes);
router.use('/candidatos', candidatosRoutes);
router.use('/cargos', cargosRoutes);
router.use('/entrevistadores', entrevistadoresRoutes);
router.use('/entrevistas', entrevistasRoutes);
router.use('/experiencias', experienciasRoutes);

router.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada en la API' });
});

module.exports = router;