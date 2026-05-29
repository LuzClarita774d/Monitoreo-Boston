document.addEventListener('DOMContentLoaded', () => {

    const user = JSON.parse(localStorage.getItem('userBoston'));
    if (!user || user.rol !== 'admin') {
        window.location.href = 'login.html';
        return;
    }

    
    const perfilDocente = document.getElementById('perfilDocente');
    perfilDocente.innerHTML = `
        <p><strong>Nombre:</strong> <br>${user.nombre}</p>
        <p><strong>Correo:</strong> <br>${user.correo}</p>
        <p><strong>Nivel:</strong> <br>${user.nivelEducativo || 'N/A'}</p>
        <p><strong>Materia:</strong> <br>${user.materia || 'Sistemas'}</p>
    `;


    document.getElementById('btnLogout').addEventListener('click', () => {
        localStorage.removeItem('userBoston');
        window.location.href = 'login.html';
    });

    const tablaEstaciones = document.getElementById('tablaEstaciones');
    const formAgregarPC = document.getElementById('formAgregarPC');
    const modalEditar = document.getElementById('modalEditar');
    const formEditarPC = document.getElementById('formEditarPC');

    
    async function cargarEstaciones() {
        try {
            const res = await fetch('/api/admin/estaciones');
            const result = await res.json();
            
            tablaEstaciones.innerHTML = '';
            if(result.data.length === 0) {
                tablaEstaciones.innerHTML = `<tr><td colspan="4" style="text-align:center;">No hay equipos registrados.</td></tr>`;
                return;
            }

            result.data.forEach(pc => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${pc.id}</td>
                    <td><strong>${pc.nombre_pc}</strong></td>
                    <td><span style="color: gray;">${pc.estado}</span></td>
                    <td>
                        <button class="btn-action btn-edit" data-id="${pc.id}" data-nombre="${pc.nombre_pc}">Editar</button>
                        <button class="btn-action btn-delete" data-id="${pc.id}">Eliminar</button>
                    </td>
                `;
                tablaEstaciones.appendChild(tr);
            });
        } catch (error) {
            console.error('Error al mapear el inventario:', error);
        }
    }


    formAgregarPC.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre_pc = document.getElementById('nuevoNombrePC').value;

        try {
            const res = await fetch('/api/admin/estaciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_pc })
            });
            const result = await res.json();
            if(result.success) {
                formAgregarPC.reset();
                cargarEstaciones();
            }
        } catch (error) {
            console.error('Error al guardar equipo:', error);
        }
    });

 
    tablaEstaciones.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');

  
        if (e.target.classList.contains('btn-delete')) {
            if (confirm('¿Estás seguro de que deseas eliminar este equipo del inventario de cómputo?')) {
                try {
                    const res = await fetch(`/api/admin/estaciones/${id}`, { method: 'DELETE' });
                    const result = await res.json();
                    if (result.success) cargarEstaciones();
                } catch (error) {
                    console.error('Error al eliminar equipo:', error);
                }
            }
        }

     
        if (e.target.classList.contains('btn-edit')) {
            const nombre = e.target.getAttribute('data-nombre');
            document.getElementById('editIdPC').value = id;
            document.getElementById('editNombrePC').value = nombre;
            modalEditar.style.display = 'flex';
        }
    });


    formEditarPC.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editIdPC').value;
        const nombre_pc = document.getElementById('editNombrePC').value;

        try {
            const res = await fetch(`/api/admin/estaciones/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre_pc })
            });
            const result = await res.json();
            if (result.success) {
                modalEditar.style.display = 'none';
                cargarEstaciones();
            }
        } catch (error) {
            console.error('Error al actualizar equipo:', error);
        }
    });

    document.getElementById('closeModal').addEventListener('click', () => modalEditar.style.display = 'none');

   
    cargarEstaciones();
});