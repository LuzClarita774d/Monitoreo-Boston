const db = require('../../config/db');

function seedUsers() {
    db.get('SELECT COUNT(*) as total FROM usuarios', [], (err, row) => {
        if (err) {
            return console.error('❌ Error al contar usuarios:', err.message);
        }

        if (row.total > 0) {
            return console.log('👤 Usuarios ya existentes, seed omitido');
        }

        const queryInsert = `
            INSERT INTO usuarios 
            (nombre, correo, password, rol) 
            VALUES (?, ?, ?, ?)
        `;

        db.run(queryInsert, [
            'Administrador Boston',
            'admin@boston.com',
            'admin123',
            'admin'
        ], (err) => {
            if (err) {
                console.error('❌ Error al crear admin:', err.message);
            } else {
                console.log('👤 Usuario Admin creado por defecto');
            }
        });

        db.run(queryInsert, [
            'Profesor de Cómputo',
            'docente@boston.com',
            'docente123',
            'docente'
        ], (err) => {
            if (err) {
                console.error('❌ Error al crear docente:', err.message);
            } else {
                console.log('👤 Usuario Docente creado por defecto');
            }
        });
    });
}

module.exports = seedUsers;