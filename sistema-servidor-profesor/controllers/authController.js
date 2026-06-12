const db = require('../config/db');

exports.login = (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({
            success: false,
            type: 'campos',
            message: 'Completa todos los campos'
        });
    }

    const sqlCorreo = `
        SELECT *
        FROM usuarios
        WHERE correo = ?
    `;

    db.get(sqlCorreo, [correo], (err, usuario) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                type: 'server',
                message: 'Error interno del servidor'
            });
        }

        if (!usuario) {
            return res.status(401).json({
                success: false,
                type: 'correo',
                message: 'El correo no existe'
            });
        }

        // Validación directa de contraseña (puedes cambiar a bcrypt después si lo necesitas)
        if (usuario.password !== password) {
            return res.status(401).json({
                success: false,
                type: 'password',
                message: 'La contraseña es incorrecta'
            });
        }

        // Guardamos los datos del usuario en la sesión de Express
        req.session.user = {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };

        return res.json({
            success: true,
            user: req.session.user
        });
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
};

exports.verify = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ success: false });
    }

    return res.json({
        success: true,
        user: req.session.user
    });
};