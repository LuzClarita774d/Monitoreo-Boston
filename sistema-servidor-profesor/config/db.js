const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../monitoreo_boston.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error al conectar SQLite:', err.message);
    } else {
        console.log('✅ Base de datos SQLite conectada con éxito');
    }
});

module.exports = db;