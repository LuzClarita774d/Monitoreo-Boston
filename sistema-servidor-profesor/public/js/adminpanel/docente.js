async function cargarDocentes() {
  const res = await fetch('/api/docentes');
  const data = await res.json();

  const tbody = document.querySelector('#docenteTable tbody');
  if (!tbody) return;

  tbody.innerHTML = data.map(docente => `
    <tr>
      <td>${docente.id}</td>
      <td>${docente.nombre}</td>
      <td>${docente.correo}</td>
      <td>${docente.area}</td>
      <td>
        <button onclick="editarDocente(${docente.id})">Editar</button>
        <button onclick="eliminarDocente(${docente.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}