const express = require('express');
const router = express.Router();
const controller = require('../controllers/experienciaController');
const { validarExperiencia } = require('../middlewares/validators');

/**
 * @swagger
 * tags:
 *   name: Experiencias
 *   description: Gestión de experiencia laboral de candidatos
 */

/**
 * @swagger
 * /api/experiencias:
 *   get:
 *     summary: Listar todas las experiencias
 *     tags: [Experiencias]
 *     responses:
 *       200:
 *         description: Lista de experiencias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experiencia'
 *   post:
 *     summary: Crear una experiencia laboral
 *     tags: [Experiencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experiencia'
 *     responses:
 *       201:
 *         description: Experiencia creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experiencia'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', controller.getExperiencias);
router.post('/', validarExperiencia, controller.createExperiencia);

/**
 * @swagger
 * /api/experiencias/{id}:
 *   get:
 *     summary: Obtener experiencia por ID
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Experiencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experiencia'
 *       404:
 *         description: Experiencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   put:
 *     summary: Actualizar experiencia
 *     tags: [Experiencias]
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
 *             $ref: '#/components/schemas/Experiencia'
 *     responses:
 *       200:
 *         description: Experiencia actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Experiencia'
 *       404:
 *         description: Experiencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     summary: Eliminar experiencia
 *     tags: [Experiencias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Experiencia eliminada
 *       404:
 *         description: Experiencia no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', controller.getExperienciaById);
router.put('/:id', validarExperiencia, controller.updateExperiencia);
router.delete('/:id', controller.deleteExperiencia);

module.exports = router;
