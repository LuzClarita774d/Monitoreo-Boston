const db = require('../config/db');

// GET /api/docentes
exports.listarDocentes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM docentes ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar docentes', error });
  }
};

// POST /api/docentes
exports.crearDocente = async (req, res) => {
  try {
    const { nombre, correo, area } = req.body;

    const [result] = await db.query(
      'INSERT INTO docentes (nombre, correo, area) VALUES (?, ?, ?)',
      [nombre, correo, area]
    );

    res.status(201).json({
      message: 'Docente creado correctamente',
      id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear docente', error });
  }
};

// PUT /api/docentes/:id
exports.actualizarDocente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, area } = req.body;

    await db.query(
      'UPDATE docentes SET nombre = ?, correo = ?, area = ? WHERE id = ?',
      [nombre, correo, area, id]
    );

    res.json({ message: 'Docente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar docente', error });
  }
};

// DELETE /api/docentes/:id
exports.eliminarDocente = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM docentes WHERE id = ?', [id]);

    res.json({ message: 'Docente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar docente', error });
  }
};