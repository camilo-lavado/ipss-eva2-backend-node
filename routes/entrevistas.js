const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrevistaController');
const { validarEntrevistaCrear, validarEntrevistaActualizar } = require('../middlewares/validators');

/**
 * @swagger
 * tags:
 *   name: Entrevistas
 *   description: Gestión de entrevistas
 */

/**
 * @swagger
 * /api/entrevistas:
 *   get:
 *     summary: Listar todas las entrevistas
 *     tags: [Entrevistas]
 *     responses:
 *       200:
 *         description: Lista de entrevistas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrevista'
 *   post:
 *     summary: Crear una entrevista
 *     tags: [Entrevistas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entrevista'
 *     responses:
 *       201:
 *         description: Entrevista creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevista'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', controller.getEntrevistas);
router.post('/', validarEntrevistaCrear, controller.createEntrevista);

/**
 * @swagger
 * /api/entrevistas/{id}:
 *   get:
 *     summary: Obtener entrevista por ID
 *     tags: [Entrevistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrevista encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevista'
 *       404:
 *         description: Entrevista no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Actualizar entrevista
 *     tags: [Entrevistas]
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
 *             $ref: '#/components/schemas/Entrevista'
 *     responses:
 *       200:
 *         description: Entrevista actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevista'
 *       404:
 *         description: Entrevista no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Eliminar entrevista
 *     tags: [Entrevistas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrevista eliminada
 *       404:
 *         description: Entrevista no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', controller.getEntrevistaById);
router.put('/:id', validarEntrevistaActualizar, controller.updateEntrevista);
router.delete('/:id', controller.deleteEntrevista);

module.exports = router;
