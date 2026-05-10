const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const LicorModel = require('./modelo');

const app = express();

// Crear carpeta uploads si no existe
const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Configuración Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const licores = await LicorModel.listar();
        res.render('index', { licores });
    } catch (err) { res.status(500).send(err.message); }
});

app.post('/api/licores', upload.single('imagen'), async (req, res) => {
    const datos = { ...req.body, imagen: req.file ? req.file.filename : 'no-image.png' };
    await LicorModel.crear(datos);
    res.redirect('/');
});

app.post('/api/licores/update/:id', upload.single('imagen'), async (req, res) => {
    const licores = await LicorModel.listar();
    const actual = licores.find(l => l.id == req.params.id);
    const datos = { ...req.body, imagen: req.file ? req.file.filename : (actual ? actual.imagen : 'no-image.png') };
    await LicorModel.actualizar(req.params.id, datos);
    res.redirect('/');
});

app.get('/api/licores/delete/:id', async (req, res) => {
    await LicorModel.eliminar(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));