const db = require('../config/db');

// GET /api/inventario
exports.listarInventario = (req, res) => {
    const sql = `
        SELECT 
            id,
            nombre,
            marca,
            modelo,
            numero_serie,
            estado,
            ubicacion,
            observaciones,
            fecha_registro
        FROM inventario
        ORDER BY id DESC
    `;

    db.all(sql, [], (error, rows) => {
        if (error) {
            console.error('Error al listar inventario:', error);

            return res.status(500).json({
                success: false,
                message: 'Error al listar inventario'
            });
        }

        res.json({
            success: true,
            data: rows
        });
    });
};

// GET /api/inventario/:id
exports.obtenerEquipoPorId = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            id,
            nombre,
            marca,
            modelo,
            numero_serie,
            estado,
            ubicacion,
            observaciones,
            fecha_registro
        FROM inventario
        WHERE id = ?
    `;

    db.get(sql, [id], (error, row) => {
        if (error) {
            console.error('Error al obtener equipo:', error);

            return res.status(500).json({
                success: false,
                message: 'Error al obtener equipo'
            });
        }

        if (!row) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado'
            });
        }

        res.json({
            success: true,
            data: row
        });
    });
};

// POST /api/inventario
exports.crearEquipo = (req, res) => {
    const {
        nombre,
        marca,
        modelo,
        numero_serie,
        estado,
        ubicacion,
        observaciones
    } = req.body;

    if (!nombre || !estado) {
        return res.status(400).json({
            success: false,
            message: 'El nombre y el estado son obligatorios'
        });
    }

    const sql = `
        INSERT INTO inventario 
        (
            nombre,
            marca,
            modelo,
            numero_serie,
            estado,
            ubicacion,
            observaciones,
            fecha_registro
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', 'localtime'))
    `;

    const params = [
        nombre,
        marca || null,
        modelo || null,
        numero_serie || null,
        estado,
        ubicacion || null,
        observaciones || null
    ];

    db.run(sql, params, function (error) {
        if (error) {
            console.error('Error al crear equipo:', error);

            return res.status(500).json({
                success: false,
                message: 'Error al crear equipo'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Equipo registrado correctamente',
            id: this.lastID
        });
    });
};

// PUT /api/inventario/:id
exports.actualizarEquipo = (req, res) => {
    const { id } = req.params;

    const {
        nombre,
        marca,
        modelo,
        numero_serie,
        estado,
        ubicacion,
        observaciones
    } = req.body;

    if (!nombre || !estado) {
        return res.status(400).json({
            success: false,
            message: 'El nombre y el estado son obligatorios'
        });
    }

    const sql = `
        UPDATE inventario
        SET
            nombre = ?,
            marca = ?,
            modelo = ?,
            numero_serie = ?,
            estado = ?,
            ubicacion = ?,
            observaciones = ?
        WHERE id = ?
    `;

    const params = [
        nombre,
        marca || null,
        modelo || null,
        numero_serie || null,
        estado,
        ubicacion || null,
        observaciones || null,
        id
    ];

    db.run(sql, params, function (error) {
        if (error) {
            console.error('Error al actualizar equipo:', error);

            return res.status(500).json({
                success: false,
                message: 'Error al actualizar equipo'
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Equipo actualizado correctamente'
        });
    });
};

// DELETE /api/inventario/:id
exports.eliminarEquipo = (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM inventario
        WHERE id = ?
    `;

    db.run(sql, [id], function (error) {
        if (error) {
            console.error('Error al eliminar equipo:', error);

            return res.status(500).json({
                success: false,
                message: 'Error al eliminar equipo'
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                success: false,
                message: 'Equipo no encontrado'
            });
        }

        res.json({
            success: true,
            message: 'Equipo eliminado correctamente'
        });
    });
};