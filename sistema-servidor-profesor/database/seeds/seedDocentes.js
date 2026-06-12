const db = require('../../config/db');

function seedDocentes() {
    db.get('SELECT COUNT(*) as total FROM docentes', [], (err, row) => {
        if (err) {
            return console.error('❌ Error al contar docentes:', err.message);
        }

        if (row.total > 0) {
            return console.log('👨‍🏫 Docentes ya tiene datos, seed omitido');
        }

        const queryInsert = `
            INSERT INTO docentes 
            (
                nombre,
                correo,
                telefono,
                especialidad,
                estado,
                observaciones
            )
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const docentes = [
            [
                'Profesor de Cómputo',
                'profesor.computo@boston.com',
                '5551234567',
                'Tecnología',
                'Activo',
                'Docente encargado del laboratorio'
            ],
            [
                'María González',
                'maria.gonzalez@boston.com',
                '5559876543',
                'Matemáticas',
                'Activo',
                'Docente de nivel secundaria'
            ]
        ];

        docentes.forEach((docente) => {
            db.run(queryInsert, docente, (err) => {
                if (err) {
                    console.error('❌ Error al insertar docente:', err.message);
                }
            });
        });

        console.log('👨‍🏫 Datos de prueba insertados en docentes');
    });
}

module.exports = seedDocentes;