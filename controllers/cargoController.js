const Cargo = require('../models/cargo');
const sequelize = require('../config/db');

const getCargos = async (req, res) => {
    try {
        const cargos = await Cargo.findAll();
        res.json(cargos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCargoById = async (req, res) => {
    try {
        const cargo = await Cargo.findByPk(req.params.id);
        if (!cargo) {
            return res.status(404).json({ error: 'Cargo no encontrado' });
        }
        res.json(cargo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCargo = async (req, res) => {
    try {
        const resultado = await sequelize.transaction(async (t) => {
            const { titulo, departamento } = req.body;
            
            if (!titulo || !departamento) {
                const error = new Error('Título y Departamento son obligatorios');
                error.status = 400;
                throw error;
            }
            
            const data = { ...req.body };
            if (data.estado === undefined) data.estado = 1; 
            
            return await Cargo.create(data, { transaction: t });
        });
        res.status(201).json(resultado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const updateCargo = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const { titulo, departamento, estado } = req.body;
            
            if (!titulo || !departamento || estado === undefined) {
                const error = new Error('Todos los campos son obligatorios');
                error.status = 400;
                throw error;
            }
            
            const [actualizado] = await Cargo.update(req.body, { 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!actualizado) {
                const error = new Error('Cargo no encontrado o no actualizado');
                error.status = 404;
                throw error;
            }
        });
        
        const cargoActualizado = await Cargo.findByPk(req.params.id);
        res.json(cargoActualizado);
    } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
    }
};

const deleteCargo = async (req, res) => {
    try {
        await sequelize.transaction(async (t) => {
            const eliminado = await Cargo.destroy({ 
                where: { id: req.params.id },
                transaction: t
            });
            
            if (!eliminado) {
                const error = new Error('Cargo no encontrado');
                error.status = 404;
                throw error;
            }
        });
        res.json({ message: 'Cargo eliminado' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ error: 'No se puede eliminar: el cargo tiene entrevistas asociadas.' });
        }
        res.status(error.status || 500).json({ error: error.message });
    }
};

module.exports = { getCargos, getCargoById, createCargo, updateCargo, deleteCargo };