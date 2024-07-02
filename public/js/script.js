document.addEventListener('DOMContentLoaded', (event) => {
    const eliminarProyecto = document.querySelectorAll('.eliminarProyecto');

    eliminarProyecto.forEach(proyecto => {
        proyecto.addEventListener('click', (event) => {
            event.preventDefault(); 

            const confirmarEliminar = confirm('¿Estas seguro que deseas eliminar esta tarea?');

            if (confirmarEliminar) {
                window.location.href = this.href; 
            } else {
                return
            }
        });
    });
});