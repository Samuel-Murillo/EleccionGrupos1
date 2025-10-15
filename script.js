document.addEventListener('DOMContentLoaded', function() {
    const btnIniciarSorteo = document.getElementById('iniciarSorteo');
    const validationMessage = document.getElementById('validationMessage');

    btnIniciarSorteo.addEventListener('click', function() {
        // Obtener los participantes y grupos
        const participantes = document.getElementById('participantes').value
            .split('\n')
            .filter(p => p.trim() !== '');
        
        const grupos = document.getElementById('grupos').value
            .split('\n')
            .filter(g => g.trim() !== '');

        // Validaciones
        if (participantes.length === 0 || grupos.length === 0) {
            validationMessage.textContent = 'Por favor, ingresa al menos un participante y un grupo';
            return;
        }

        if (participantes.length < grupos.length) {
            validationMessage.textContent = 'Debe haber al menos tantos participantes como grupos';
            return;
        }

        // Guardar los datos en localStorage
        localStorage.setItem('participantes', JSON.stringify(participantes));
        localStorage.setItem('grupos', JSON.stringify(grupos));

        // Redirigir a la página de sorteo
        window.location.href = 'sorteo.html';
    });
});