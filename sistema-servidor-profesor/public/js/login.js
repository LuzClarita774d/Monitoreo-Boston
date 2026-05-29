document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMsg');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const correo = document.getElementById('correo').value;
        const password = document.getElementById('contrasena').value;

        errorMsg.style.display = 'none';

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });

            const data = await response.json();

            if (data.success) {

                localStorage.setItem('user', JSON.stringify(data.user));

                if (data.user.rol === 'admin') {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/panel';
                }

            } else {
                errorMsg.innerText = data.message;
                errorMsg.style.display = 'block';
            }

        } catch (error) {
            errorMsg.innerText = 'Error de conexión con el servidor';
            errorMsg.style.display = 'block';
        }
    });
});