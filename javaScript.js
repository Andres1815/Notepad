let notas = JSON.parse(localStorage.getItem('notas')) || [];
let notaActual = null;

function guardarNota() {
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('editor').innerHTML;
    if (notaActual !== null) {
        notas[notaActual].titulo = titulo;
        notas[notaActual].contenido = contenido;
    } else {
        notas.push({ titulo, contenido });
    }
    localStorage.setItem('notas', JSON.stringify(notas));
    actualizarListaNotas();
    alert('Nota guardada');
}

function cargarNota(index) {
    notaActual = index;
    document.getElementById('titulo').value = notas[index].titulo;
    document.getElementById('editor').innerHTML = notas[index].contenido;
}

function nuevaNota() {
    document.getElementById('titulo').value = '';
    document.getElementById('editor').innerHTML = '';
    notaActual = null;
}

function eliminarNota() {
    if (notaActual !== null) {
        notas.splice(notaActual, 1);
        localStorage.setItem('notas', JSON.stringify(notas));
        actualizarListaNotas();
        nuevaNota();
        alert('Nota eliminada');
    } else {
        alert('No hay ninguna nota seleccionada para eliminar');
    }
}

function actualizarListaNotas() {
    const listaNotas = document.getElementById('listaNotas');
    listaNotas.innerHTML = '';
    notas.forEach((nota, index) => {
        const li = document.createElement('li');
        li.textContent = nota.titulo || `Nota ${index + 1}`;
        li.onclick = () => cargarNota(index);
        listaNotas.appendChild(li);
    });
}

window.onload = function() {
    actualizarListaNotas();
    if (notas.length > 0) {
        cargarNota(0);
    }
};
