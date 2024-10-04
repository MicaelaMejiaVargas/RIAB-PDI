document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro-mascota');
    const submitButton = form.querySelector('button[type="submit"]');

    // Habilitar/deshabilitar el botón de envío basado en la validez del formulario
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

    // Manejar el envío del formulario
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Recoger datos del formulario
        const nombreApodo = document.getElementById('nombre-apodo').value;
        const especie = document.getElementById('especie').value;
        const raza = document.getElementById('raza').value;
        const color = document.getElementById('color').value;
        const anioNacimiento = document.getElementById('anio-nacimiento').value;

        const mascotasData = {
            nombre_apodo: nombreApodo,
            especie,
            raza,
            color,
            anio_nacimiento: parseInt(anioNacimiento, 10) // Asegúrate de que sea un número
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
