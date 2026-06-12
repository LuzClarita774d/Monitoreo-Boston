const db = require('../../config/db');

const seedUsers = require('../seeds/seedUsers');
const seedInventario = require('../seeds/seedInventario');
const seedDocentes = require('../seeds/seedDocentes');

function initDatabase() {
    db.serialize(() => {
        crearTablaUsuarios();
        crearTablaInventario();
        crearTablaDocentes();
    });
}

function crearTablaUsuarios() {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            rol TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error al crear la tabla usuarios:', err.message);
        } else {
            console.log('📋 Tabla "usuarios" verificada/creada');
            seedUsers();
        }
    });
}

function crearTablaInventario() {
    db.run(`
        CREATE TABLE IF NOT EXISTS inventario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            marca TEXT,
            modelo TEXT,
            numero_serie TEXT,
            estado TEXT NOT NULL DEFAULT 'Disponible',
            ubicacion TEXT,
            observaciones TEXT,
            fecha_registro TEXT DEFAULT (datetime('now', 'localtime'))
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error al crear la tabla inventario:', err.message);
        } else {
            console.log('📦 Tabla "inventario" verificada/creada');
            seedInventario();
        }
    });
}

function crearTablaDocentes() {
    db.run(`
        CREATE TABLE IF NOT EXISTS docentes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            telefono TEXT,
            especialidad TEXT,
            estado TEXT NOT NULL DEFAULT 'Activo',
            observaciones TEXT,
            fecha_registro TEXT DEFAULT (datetime('now', 'localtime'))
        )
    `, (err) => {
        if (err) {
            console.error('❌ Error al crear la tabla docentes:', err.message);
        } else {
            console.log('👨‍🏫 Tabla "docentes" verificada/creada');
            seedDocentes();
        }
    });
}

module.exports = initDatabase;