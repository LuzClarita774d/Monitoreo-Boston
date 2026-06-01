const db = require('../config/db');

exports.login = (req, res) => {

    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            success: false,
            message: 'Correo y contraseña requeridos'
        });
    }

    console.log('Correo recibido:', correo);
    console.log('Password recibido:', password);

    const query = `
        SELECT id, nombre, correo, nivel_educativo, materia, rol
        FROM usuarios
        WHERE correo = ? AND password = ?
    `;

    db.get(query, [correo, password], (err, row) => {

        console.log('Resultado SQL:', row);

        if (err) {
            console.error(err.message);
            return res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }

        if (!row) {
            return res.status(401).json({
                success: false,
                message: 'Correo o contraseña incorrectos'
            });
        }

        return res.json({
            success: true,
            user: row
        });
    });
};