const express = require('express');
const router = express.Router();
const controller = require('../controllers/entrevistadorController');
const { validarEntrevistador } = require('../middlewares/validators');

/**
 * @swagger
 * tags:
 *   name: Entrevistadores
 *   description: Gestión de entrevistadores
 */

/**
 * @swagger
 * /api/entrevistadores:
 *   get:
 *     summary: Listar todos los entrevistadores
 *     tags: [Entrevistadores]
 *     responses:
 *       200:
 *         description: Lista de entrevistadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Entrevistador'
 *   post:
 *     summary: Crear un entrevistador
 *     tags: [Entrevistadores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Entrevistador'
 *     responses:
 *       201:
 *         description: Entrevistador creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevistador'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', controller.getEntrevistadores);
router.post('/', validarEntrevistador, controller.createEntrevistador);

/**
 * @swagger
 * /api/entrevistadores/{id}:
 *   get:
 *     summary: Obtener entrevistador por ID
 *     tags: [Entrevistadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrevistador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevistador'
 *       404:
 *         description: Entrevistador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Actualizar entrevistador
 *     tags: [Entrevistadores]
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
 *             $ref: '#/components/schemas/Entrevistador'
 *     responses:
 *       200:
 *         description: Entrevistador actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Entrevistador'
 *       404:
 *         description: Entrevistador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email ya registrado por otro entrevistador
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Eliminar entrevistador
 *     tags: [Entrevistadores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrevistador eliminado
 *       404:
 *         description: Entrevistador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', controller.getEntrevistadorById);
router.put('/:id', validarEntrevistador, controller.updateEntrevistador);
router.delete('/:id', controller.deleteEntrevistador);

module.exports = router;
