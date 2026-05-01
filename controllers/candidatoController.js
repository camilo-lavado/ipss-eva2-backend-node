const Candidato = require('../models/candidato');
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
        const { nombres, apellidos, email, telefono } = req.body;
        if (!nombres || !email) {
            return res.status(400).json({ error: 'Nombres y Email son obligatorios' });
        }
        const existeEmail = await Candidato.findOne({ where: { email } });
        if (existeEmail) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }
        const nuevoCandidato = await Candidato.create(req.body);
        res.status(201).json(nuevoCandidato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCandidato = async (req, res) => {
    try {
        const { nombres, email } = req.body;
        if (!nombres || !email) {
            return res.status(400).json({ error: 'Nombres y Email son obligatorios' });
        }
        const existeEmail = await Candidato.findOne({ 
            where: { 
                email, 
                id: { [Op.ne]: req.params.id } 
            } 
        });
        if (existeEmail) {
            return res.status(400).json({ error: 'El email ya está registrado por otro candidato' });
        }
        const [actualizado] = await Candidato.update(req.body, { where: { id: req.params.id } });
        if (!actualizado) {
            return res.status(404).json({ error: 'Candidato no encontrado o no actualizado' });
        }
        const candidatoActualizado = await Candidato.findByPk(req.params.id);
        res.json(candidatoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCandidato = async (req, res) => {
    try {
        const eliminado = await Candidato.destroy({ where: { id: req.params.id } });
        if (!eliminado) {
            return res.status(404).json({ error: 'Candidato no encontrado' });
        }
        res.json({ message: 'Candidato eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getCandidatos, getCandidatoById, createCandidato, updateCandidato, deleteCandidato };