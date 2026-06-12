document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('loginForm');

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const correo = document.getElementById('correo').value.trim();
        const password = document.getElementById('contrasena').value.trim(); 

        try {

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo,
                    password
                })
            });

            const data = await response.json();

            if (!data.success) {

                if (data.type === 'correo') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Correo incorrecto',
                        text: 'El correo ingresado no existe.'
                    });
                    return;
                }

                if (data.type === 'password') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Contraseña incorrecta',
                        text: 'La contraseña ingresada no es válida.'
                    });
                    return;
                }

                Swal.fire({
                    icon: 'warning',
                    title: 'Datos incompletos',
                    text: data.message
                });

                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: `Hola ${data.user.nombre}`
            }).then(() => {

                if (data.user.rol === 'admin') {
                    window.location.href = '/admin';
                }

                if (data.user.rol === 'docente') {
                    window.location.href = '/panel';
                }

            });

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No fue posible conectar con el servidor.'
            });
        }
    });
});