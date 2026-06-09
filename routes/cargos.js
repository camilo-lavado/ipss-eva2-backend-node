const express = require('express');
const router = express.Router();
const controller = require('../controllers/cargoController');
const { validarCargoCrear, validarCargoActualizar } = require('../middlewares/validators');

/**
 * @swagger
 * tags:
 *   name: Cargos
 *   description: Gestión de cargos/vacantes
 */

/**
 * @swagger
 * /api/cargos:
 *   get:
 *     summary: Listar todos los cargos
 *     tags: [Cargos]
 *     responses:
 *       200:
 *         description: Lista de cargos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cargo'
 *   post:
 *     summary: Crear un cargo
 *     tags: [Cargos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cargo'
 *     responses:
 *       201:
 *         description: Cargo creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cargo'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', controller.getCargos);
router.post('/', validarCargoCrear, controller.createCargo);

/**
 * @swagger
 * /api/cargos/{id}:
 *   get:
 *     summary: Obtener cargo por ID
 *     tags: [Cargos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cargo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cargo'
 *       404:
 *         description: Cargo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Actualizar cargo
 *     tags: [Cargos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cargo'
 *     responses:
 *       200:
 *         description: Cargo actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cargo'
 *       404:
 *         description: Cargo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Eliminar cargo
 *     tags: [Cargos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cargo eliminado
 *       404:
 *         description: Cargo no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', controller.getCargoById);
router.put('/:id', validarCargoActualizar, controller.updateCargo);
router.delete('/:id', controller.deleteCargo);

module.exports = router;
