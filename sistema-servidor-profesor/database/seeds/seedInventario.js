const db = require('../../config/db');

function seedInventario() {
    db.get('SELECT COUNT(*) as total FROM inventario', [], (err, row) => {
        if (err) {
            return console.error('❌ Error al contar inventario:', err.message);
        }

        if (row.total > 0) {
            return console.log('📦 Inventario ya tiene datos, seed omitido');
        }

        const queryInsert = `
            INSERT INTO inventario 
            (
                nombre,
                marca,
                modelo,
                numero_serie,
                estado,
                ubicacion,
                observaciones
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const equipos = [
            [
                'Laptop',
                'HP',
                'ProBook 440',
                'HP-001-2026',
                'Disponible',
                'Laboratorio 1',
                'Equipo en buen estado'
            ],
            [
                'Proyector',
                'Epson',
                'X49',
                'EP-002-2026',
                'Mantenimiento',
                'Aula 3',
                'Revisar lámpara'
            ],
            [
                'Monitor',
                'Dell',
                'P2219H',
                'DE-003-2026',
                'Asignado',
                'Dirección',
                'Asignado a administración'
            ]
        ];

        equipos.forEach((equipo) => {
            db.run(queryInsert, equipo, (err) => {
                if (err) {
                    console.error('❌ Error al insertar equipo:', err.message);
                }
            });
        });

        console.log('📦 Datos de prueba insertados en inventario');
    });
}

module.exports = seedInventario;