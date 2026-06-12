const express = require('express'); 
const session = require('express-session');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

// BASE DE DATOS
require('./config/db');

const initDatabase = require('./database/migrations/init');
initDatabase();

// SESSION
app.use(session({
    secret: 'boston_secret_key_2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8
    }
}));

// SOCKETS
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

try {
    const inicializarAulaSocket = require('./sockets/aulaSocket');
    inicializarAulaSocket(io);
    console.log('✅ WebSockets cargados');
} catch (error) {
    console.log('⚠️ aulaSocket no encontrado u omitido por ahora');
}

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PUBLIC_PATH = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_PATH));

// SEGURIDAD / MIDDLEWARES
const {
    requireAuth,
    requireRole
} = require('./middleware/authmiddleware');

// LOGS
app.use((req, res, next) => {
    console.log(`📡 ${req.method} ${req.url}`);
    next();
});

// ROUTES
const authRoutes = require('./routes/authRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/inventario', inventarioRoutes);

// VISTAS Y REDIRECCIONES

app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'login.html'));
});

app.get('/panel', requireAuth, requireRole('docente'), (req, res) => {
    console.log(`✅ Acceso Docente: ${req.session.user.nombre}`);
    res.sendFile(path.join(PUBLIC_PATH, 'panel.html'));
});

app.get('/admin', requireAuth, requireRole('admin'), (req, res) => {
    console.log(`✅ Acceso Admin: ${req.session.user.nombre}`);
    res.sendFile(path.join(PUBLIC_PATH, 'admin.html'));
});

// 404
app.use((req, res) => {
    console.log(`❌ Ruta inexistente: ${req.url}`);
    res.status(404).send('404 - Ruta no encontrada');
});

// START
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('');
    console.log('==============================');
    console.log('  SERVIDOR BOSTON INICIADO   ');
    console.log('==============================');
    console.log(`🌐 http://localhost:${PORT}`);
    console.log(`🔐 Login: http://localhost:${PORT}`);
    console.log(`👨‍🏫 Panel Docente: http://localhost:${PORT}/panel`);
    console.log(`⚙️ Panel Admin: http://localhost:${PORT}/admin`);
    console.log('==============================');
    console.log('');
});

module.exports = server;