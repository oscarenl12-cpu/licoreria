const db = require('./database');

const LicorModel = {
    listar: () => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM licores', [], (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
        });
    },

    crear: (datos) => {
        return new Promise((resolve, reject) => {
            const { nombre, marca, tipo, imagen } = datos;
            db.run('INSERT INTO licores (nombre, marca, tipo, imagen) VALUES (?, ?, ?, ?)', 
            [nombre, marca, tipo, imagen], function(err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    },

    actualizar: (id, datos) => {
        return new Promise((resolve, reject) => {
            const { nombre, marca, tipo, imagen } = datos;
            db.run('UPDATE licores SET nombre=?, marca=?, tipo=?, imagen=? WHERE id=?', 
            [nombre, marca, tipo, imagen, id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    },

    eliminar: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM licores WHERE id=?', [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }
};

module.exports = LicorModel;