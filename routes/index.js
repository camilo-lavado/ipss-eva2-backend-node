const express = require('express');
const router = express.Router();

const usuariosRoutes = require('./usuarios');

router.use('/usuarios', usuariosRoutes);


router.use((req, res, next) => {
    console.log(`Ruta accedida: ${req.method} ${req.url}`);
    next();
});

router.use((req, res, next) => {
    console.log('Ruta no manejada:', req.method, req.url);
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router;

