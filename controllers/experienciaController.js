const Experiencia = require('../models/experiencia');

const getExperiencias = async (req, res) => {
    try {
        const experiencias = await Experiencia.findAll();
        res.json(experiencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getExperienciaById = async (req, res) => {
    try {
        const experiencia = await Experiencia.findByPk(req.params.id);
        if (!experiencia) {
            return res.status(404).json({ error: 'Experiencia no encontrada' });
        }
        res.json(experiencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createExperiencia = async (req, res) => {
    try {
        const { empresa, cargo_ejercido } = req.body;
        if (!empresa || !cargo_ejercido) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }
        const nuevaExperiencia = await Experiencia.create(req.body);
        res.status(201).json(nuevaExperiencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateExperiencia = async (req, res) => {
    try {
        const { empresa, cargo_ejercido } = req.body;
        if (!empresa || !cargo_ejercido) {
            return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes' });
        }
        const [actualizado] = await Experiencia.update(req.body, { where: { id: req.params.id } });
        if (!actualizado) {
            return res.status(404).json({ error: 'Experiencia no encontrada' });
        }
        const experienciaActualizada = await Experiencia.findByPk(req.params.id);
        res.json(experienciaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteExperiencia = async (req, res) => {
    try {
        const eliminado = await Experiencia.destroy({ where: { id: req.params.id } });
        if (!eliminado) {
            return res.status(404).json({ error: 'Experiencia no encontrada' });
        }
        res.json({ message: 'Experiencia eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getExperiencias, getExperienciaById, createExperiencia, updateExperiencia, deleteExperiencia };