const Experiencia = require('../models/experiencia');
const sequelize = require('../config/db');

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
        const resultado = await sequelize.transaction(async (t) => {
            const { empresa, cargo_ejercido } = req.body;
            
            if (!empresa || !cargo_ejercido) {
                const error = new Error('Faltan campos obligatorios');
                error.status = 400;
                throw error;
            }
            
            return await Experiencia.create(req.body, { transaction: t });
        });
        res.status(201).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const updateExperiencia = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const { empresa, cargo_ejercido } = req.body;
            
            if (!empresa || !cargo_ejercido) {
                const error = new Error('Todos los campos obligatorios deben estar presentes');
                error.status = 400;
                throw error;
            }
            
            const [actualizado] = await Experiencia.update(req.body, { 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!actualizado) {
                const error = new Error('Experiencia no encontrada');
                error.status = 404;
                throw error;
            }
        });
        
        const experienciaActualizada = await Experiencia.findByPk(req.params.id);
        res.json(experienciaActualizada);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const deleteExperiencia = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const eliminado = await Experiencia.destroy({ 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!eliminado) {
                const error = new Error('Experiencia no encontrada');
                error.status = 404;
                throw error;
            }
        });
        res.json({ message: 'Experiencia eliminada' });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getExperiencias, getExperienciaById, createExperiencia, updateExperiencia, deleteExperiencia };