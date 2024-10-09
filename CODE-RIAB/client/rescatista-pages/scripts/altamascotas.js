const razasPermitidas = {
    perro: ['labrador', 'bulldog', 'beagle', 'poodle', 'chihuahua', 'otro'],
    gato: ['persa', 'siamés', 'bengalí', 'maine coon', 'cruza', 'otro'],
    loro: ['cacatúa', 'loro gris', 'amazonas', 'agaporni', 'loro de sol', 'otro'],
    tortuga: ['tortuga de tierra', 'tortuga de agua', 'tortuga de estanque', 'tortuga gigante', 'otro'],
    conejo: ['holland lop', 'rex', 'angora', 'mini rex', 'lionhead', 'otro'],
    pato: ['pato pekinés', 'pato muscovy', 'pato rizado', 'pato cayuga', 'pato rouen', 'otro'],
    otro: ['otro'] // Para la opción "otro"
};

const especieSelect = document.getElementById('especie');
const razaSelect = document.getElementById('raza');

// Listener para actualizar las razas cuando cambie la especie
especieSelect.addEventListener('change', function() {
    const especie = this.value;
    razaSelect.innerHTML = '<option value="">Seleccione una raza</option>'; // Reiniciar opciones

    if (especie && razasPermitidas[especie]) {
        razasPermitidas[especie].forEach(raza => {
            razaSelect.innerHTML += `<option value="${raza}">${raza}</option>`;
        });
    }
});

// Manejo de envío del formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mascotaForm');
    const submitButton = form.querySelector('button[type="submit"]');

    // Validación y habilitación del botón de envío
    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;

        // Mostrar/ocultar mensajes de error
        Array.from(form.elements).forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
    });

    // Envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombreApodo = document.getElementById('nombre_apodo').value;
        const especie = document.getElementById('especie').value;
        const raza = document.getElementById('raza').value;
        const color = document.getElementById('color').value;
        const anioNacimiento = document.getElementById('anio_nacimiento').value;

        const mascotasData = {
            nombre_apodo: nombreApodo,
            especie,
            raza,
            color,
            anio_nacimiento: anioNacimiento
        };

        try {
            const response = await fetch('http://localhost:3000/mascotas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mascotasData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Registro exitoso: ' + data.message);
                form.reset();
                razaSelect.innerHTML = '<option value="">Seleccione una raza</option>'; // Reiniciar razas
                window.location.href = '../pages/historial.html'; 
            } else {
                alert('Error: ' + (data.message || 'Error en el registro.'));
            }
        } catch (error) {
            console.error('Error al registrar la mascota:', error);
            alert('Error en el registro. Por favor, inténtelo de nuevo más tarde.');
        }
    });
});
