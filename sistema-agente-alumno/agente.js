const { exec } = require('child_process');

// Función nativa para mover el mouse y hacer clic (0% dependencias externas)
function intervenirAlumno(x, y) {
    const comandoPowerShell = `[Void][User32]: :SetCursorPos(${x}, ${y}); [Void][User32]: :mouse_event(0x0002, 0, 0, 0, 0); [Void][User32]: :mouse_event(0x0004, 0, 0, 0, 0);`;
    
    exec(`powershell -command "${comandoPowerShell}"`, (error) => {
        if (error) console.error("Error al mover el mouse:", error);
    });
}

// Ejemplo de uso cuando llegue el evento del servidor del profesor:
// socket.on('intervencion-servidor', (data) => {
//     intervenirAlumno(data.x, data.y);
// });