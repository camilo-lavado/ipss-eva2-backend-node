const Entrevistador = require('../models/entrevistador');
const { Op } = require('sequelize');

const getEntrevistadores = async (req, res) => {
    try {
        const entrevistadores = await Entrevistador.findAll();
        res.json(entrevistadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEntrevistadorById = async (req, res) => {
    try {
        const entrevistador = await Entrevistador.findByPk(req.params.id);
        if (!entrevistador) {
            return res.status(404).json({ error: 'Entrevistador no encontrado' });
        }
        res.json(entrevistador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEntrevistador = async (req, res) => {
    try {
        const { nombres, email } = req.body;
        if (!nombres || !email) {
            return res.status(400).json({ error: 'Nombres y Email son obligatorios' });
        }
        const existeEmail = await Entrevistador.findOne({ where: { email } });
        if (existeEmail) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        const nuevoEntrevistador = await Entrevistador.create(req.body);
        res.status(201).json(nuevoEntrevistador);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEntrevistador = async (req, res) => {
    try {
        const { nombres, email } = req.body;
        if (!nombres || !email) {
            return res.status(400).json({ error: 'Nombres y Email son obligatorios' });
        }
        const existeEmail = await Entrevistador.findOne({ 
            where: { 
                email, 
                id: { [Op.ne]: req.params.id } 
            } 
        });
        if (existeEmail) {
            return res.status(400).json({ error: 'El email ya está registrado por otro entrevistador' });
        }
        const [actualizado] = await Entrevistador.update(req.body, { where: { id: req.params.id } });
        if (!actualizado) {
            return res.status(404).json({ error: 'Entrevistador no encontrado' });
        }
        const entrevistadorActualizado = await Entrevistador.findByPk(req.params.id);
        res.json(entrevistadorActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEntrevistador = async (req, res) => {
    try {
        const eliminado = await Entrevistador.destroy({ where: { id: req.params.id } });
        if (!eliminado) {
            return res.status(404).json({ error: 'Entrevistador no encontrado' });
        }
        res.json({ message: 'Entrevistador eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getEntrevistadores, getEntrevistadorById, createEntrevistador, updateEntrevistador, deleteEntrevistador };