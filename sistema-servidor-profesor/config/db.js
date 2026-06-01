const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'monitoreo_boston.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error SQLite:', err.message);
    } else {
        console.log('✅ Base de datos conectada');
    }
});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            nombre TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            nivel_educativo TEXT,
            materia TEXT,
            rol TEXT NOT NULL DEFAULT 'profesor'
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS estaciones (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_pc TEXT UNIQUE NOT NULL,
            estado TEXT DEFAULT 'Inactiva',
            alumno_asignado TEXT DEFAULT 'Sin asignar',
            ultima_alerta TEXT DEFAULT 'Ninguna'
        )
    `, (err) => {
        if (!err) insertarAdmin();
    });
});

function insertarAdmin() {
    db.get(`SELECT COUNT(*) as count FROM usuarios`, [], (err, row) => {
        if (!err && row.count === 0) {

            db.run(`
                INSERT INTO usuarios 
                (username, password, nombre, correo, nivel_educativo, materia, rol)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [
                'admin.boston',
                '   ',
                'Administrador General',
                'admin@boston.edu.mx',
                'Secundaria / Bachillerato',
                'Tecnología e Informática',
                'admin'
            ]);

            console.log('👤 Admin creado');
        }
    });
}

module.exports = db;