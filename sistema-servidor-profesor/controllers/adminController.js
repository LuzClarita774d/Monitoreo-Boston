const db = require('../config/db');

// --- CRUD DE ESTACIONES DE TRABAJO (COMPUTADORAS) ---

// 1. Obtener todas las PCs
exports.getEstaciones = (req, res) => {
    db.all(`SELECT id, nombre_pc, estado FROM estaciones`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(200).json({ success: true, data: rows });
    });
};


exports.addEstacion = (req, res) => {
    const { nombre_pc } = req.body;
    if (!nombre_pc) {
        return res.status(400).json({ success: false, message: 'El nombre de la PC es requerido.' });
    }


    db.run(`INSERT INTO estaciones (nombre_pc, estado) VALUES (?, 'Inactiva')`, [nombre_pc], function(err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.status(201).json({ 
            success: true, 
            message: 'Equipo registrado con éxito.', 
            id: this.lastID  
        });
    });
};


exports.updateEstacion = (req, res) => {
    const { id } = req.params;
    const { nombre_pc } = req.body;

    if (!nombre_pc) {
        return res.status(400).json({ success: false, message: 'El nuevo nombre de la PC es requerido.' });
    }


    db.run(`UPDATE estaciones SET nombre_pc = ? WHERE id = ?`, [nombre_pc, id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'Equipo no encontrado.' });
        }
        res.status(200).json({ success: true, message: 'Equipo actualizado correctamente.' });
    });
};


exports.deleteEstacion = (req, res) => {
    const { id } = req.params;


    db.run(`DELETE FROM estaciones WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ success: false, message: 'Equipo no encontrado.' });
        }
        res.status(200).json({ success: true, message: 'Equipo eliminado del inventario.' });
    });
};