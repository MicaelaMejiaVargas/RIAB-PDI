document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('id').value;
        const castrado = document.getElementById('castrado').value;
        const operado = document.getElementById('operado').value;
        const discapacidad = document.getElementById('discapacidad').value;
        const rabia = document.getElementById('rabia').value;
        const enfermedades = document.getElementById('enfermedades').value;
        const desparasitado = document.getElementById('desparasitado').value;
        //const genero = document.querySelector('input[name="genero"]:checked').value;

        const historialData = {
            id,
            castrado,
            operado,
            discapacidad,
            rabia,
            enfermedades,
            desparasitado,
        };

        try {
            const response = await fetch('http://localhost:3000/historial/historial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(historialData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Registro exitoso: ' + data.message);
                form.reset();
                window.location.href = '../pages/historial.html';
            } else {
                alert('Error: ' + data.message || 'Error en el registro.');
            }
        } catch (error) {
            console.error('Error al registrar el historial:', error);
            document.querySelector('.error').style.display = 'block';
        }
    });
});