const Candidato = require('../models/candidato');
const sequelize = require('../config/db');
const { Op } = require('sequelize');

const getCandidatos = async (req, res) => {
    try {
        const candidatos = await Candidato.findAll();
        res.json(candidatos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCandidatoById = async (req, res) => {
    try {
        const candidato = await Candidato.findByPk(req.params.id);
        if (!candidato) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.json(candidato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCandidato = async (req, res) => {
    try {
        const resultado = await sequelize.transaction(async (t) => {
            const { nombres, apellidos, email, telefono } = req.body;
            
            if (!nombres || !email) {
                const error = new Error('Nombres y Email son obligatorios');
                error.status = 400;
                throw error;
            }
            
            const existeEmail = await Candidato.findOne({ 
                where: { email },
                transaction: t 
            });
            
            if (existeEmail) {
                const error = new Error('El email ya está registrado');
                error.status = 400;
                throw error;
            }
            
            return await Candidato.create(req.body, { transaction: t });
        });
        res.status(201).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const updateCandidato = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const { nombres, email } = req.body;
            
            if (!nombres || !email) {
                const error = new Error('Nombres y Email son obligatorios');
                error.status = 400;
                throw error;
            }
            
            const existeEmail = await Candidato.findOne({ 
                where: { email, id: { [Op.ne]: req.params.id } },
                transaction: t 
            });
            
            if (existeEmail) {
                const error = new Error('El email ya está registrado por otro candidato');
                error.status = 400;
                throw error;
            }
            
            const [actualizado] = await Candidato.update(req.body, { 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!actualizado) {
                const error = new Error('Candidato no encontrado o no actualizado');
                error.status = 404;
                throw error;
            }
        });
        
        const candidatoActualizado = await Candidato.findByPk(req.params.id);
        res.json(candidatoActualizado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const deleteCandidato = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const eliminado = await Candidato.destroy({ 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!eliminado) {
                const error = new Error('Candidato no encontrado');
                error.status = 404;
                throw error;
            }
        });
        res.json({ message: 'Candidato eliminado' });
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getCandidatos, getCandidatoById, createCandidato, updateCandidato, deleteCandidato };