const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarios');
const candidatosRoutes = require('./candidatos');
const cargosRoutes = require('./cargos');
const entrevistadoresRoutes = require('./entrevistadores');
const entrevistasRoutes = require('./entrevistas');
const experienciasRoutes = require('./experiencias');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Estado del servidor
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servidor en línea
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:      { type: string, example: online }
 *                 version:     { type: string, example: 1.0.0 }
 *                 environment: { type: string, example: development }
 */
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