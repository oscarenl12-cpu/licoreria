const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'licores.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error al abrir DB:', err.message);
    else console.log('Conectado a SQLite: licores.db');
});

// Aseguramos que la tabla tenga la columna 'imagen'
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS licores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            marca TEXT NOT NULL,
            tipo TEXT NOT NULL,
            imagen TEXT
        )
    `);
});

module.exports = db;