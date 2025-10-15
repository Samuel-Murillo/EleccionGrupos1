document.addEventListener('DOMContentLoaded', function() {
    // Recuperar datos del localStorage
    const participantes = JSON.parse(localStorage.getItem('participantes'));
    const grupos = JSON.parse(localStorage.getItem('grupos'));

    if (!participantes || !grupos) {
        window.location.href = 'index.html';
        return;
    }

    // Crear la estructura de los grupos
    const gruposContainer = document.getElementById('gruposContainer');
    const participanteActual = document.getElementById('participanteActual');
    
    // Crear contenedores de grupos
    grupos.forEach(grupo => {
        const grupoDiv = document.createElement('div');
        grupoDiv.className = 'grupo';
        grupoDiv.innerHTML = `
            <div class="grupo-header">${grupo}</div>
            <div class="grupo-participantes" id="grupo-${grupo}"></div>
        `;
        gruposContainer.appendChild(grupoDiv);
    });

    // Función para mezclar array aleatoriamente
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Distribuir participantes
    function distribuirParticipantes() {
        const participantesMezclados = shuffle([...participantes]);
        let index = 0;

        function asignarSiguienteParticipante() {
            if (index >= participantesMezclados.length) {
                participanteActual.textContent = '¡Sorteo Completado!';
                return;
            }

            const participante = participantesMezclados[index];
            participanteActual.textContent = `Sorteando: ${participante}`;

            // Determinar a qué grupo va
            const grupoIndex = Math.floor(index / Math.ceil(participantesMezclados.length / grupos.length));
            const grupoNombre = grupos[grupoIndex];
            
            setTimeout(() => {
                const grupoDiv = document.getElementById(`grupo-${grupoNombre}`);
                const participanteDiv = document.createElement('div');
                participanteDiv.className = 'participante';
                participanteDiv.textContent = participante;
                grupoDiv.appendChild(participanteDiv);

                index++;
                asignarSiguienteParticipante();
            }, 1000); // Esperar 1 segundo entre cada asignación
        }

        asignarSiguienteParticipante();
    }

    // Iniciar el sorteo después de un breve retraso
    setTimeout(distribuirParticipantes, 500);
});