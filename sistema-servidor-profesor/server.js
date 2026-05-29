const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');


require('./config/db');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const inicializarAulaSocket = require('./sockets/aulaSocket');
inicializarAulaSocket(io);

const PUBLIC_PATH = path.join(__dirname, 'public');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req, res, next) => {
    console.log(`📡 ${req.method} -> ${req.url}`);
    next();
});


app.use(express.static(PUBLIC_PATH));


const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);


app.get('/', (req, res) => {
    console.log('🔐 Abriendo Login...');
    res.sendFile(path.join(PUBLIC_PATH, 'login.html'));
});


app.get('/panel', (req, res) => {
    console.log('🖥️ Abriendo Panel Docente...');
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
});


app.get('/admin', (req, res) => {
    console.log('⚙️ Abriendo Panel Administrativo...');
    res.sendFile(path.join(PUBLIC_PATH, 'admin.html'));
});


app.use((req, res) => {
    console.log(`❌ Ruta no encontrada: ${req.url}`);
    res.status(404).send(`
        <h1>404 - Ruta no encontrada</h1>
        <p>La página solicitada no existe.</p>
    `);
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('-------');
    console.log('SERVIDOR DE MONITOREO BOSTON CORRIENDO');
    console.log(`Web: http://localhost:${PORT}`);
    console.log(` Login: http://localhost:${PORT}`);
    console.log(`Panel Docente: http://localhost:${PORT}/panel`);
    console.log(` Panel Admin: http://localhost:${PORT}/admin`);
    console.log(' WebSockets activos');
    console.log('----------');
});

module.exports = server;