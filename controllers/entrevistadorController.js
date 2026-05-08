const Entrevistador = require('../models/entrevistador');
const sequelize = require('../config/db');
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
        const resultado = await sequelize.transaction(async (t) => {
            const { nombres, email } = req.body;
            
            if (!nombres || !email) {
                const error = new Error('Nombres y Email son obligatorios');
                error.status = 400;
                throw error;
            }
            
            const existeEmail = await Entrevistador.findOne({ 
                where: { email },
                transaction: t
            });
            
            if (existeEmail) {
                const error = new Error('El email ya está registrado');
                error.status = 400;
                throw error;
            }
            
            return await Entrevistador.create(req.body, { transaction: t });
        });
        res.status(201).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const updateEntrevistador = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const { nombres, email } = req.body;
            
            if (!nombres || !email) {
                const error = new Error('Nombres y Email son obligatorios');
                error.status = 400;
                throw error;
            }
            
            const existeEmail = await Entrevistador.findOne({ 
                where: { email, id: { [Op.ne]: req.params.id } },
                transaction: t
            });
            
            if (existeEmail) {
                const error = new Error('El email ya está registrado por otro entrevistador');
                error.status = 400;
                throw error;
            }
            
            const [actualizado] = await Entrevistador.update(req.body, { 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!actualizado) {
                const error = new Error('Entrevistador no encontrado');
                error.status = 404;
                throw error;
            }
        });
        
        const entrevistadorActualizado = await Entrevistador.findByPk(req.params.id);
        res.json(entrevistadorActualizado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const deleteEntrevistador = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const eliminado = await Entrevistador.destroy({ 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!eliminado) {
                const error = new Error('Entrevistador no encontrado');
                error.status = 404;
                throw error;
            }
        });
        res.json({ message: 'Entrevistador eliminado' });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getEntrevistadores, getEntrevistadorById, createEntrevistador, updateEntrevistador, deleteEntrevistador };