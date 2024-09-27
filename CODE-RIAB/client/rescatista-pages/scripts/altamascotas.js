    const form = document.getElementById('form-registro-mascota');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;
    });
    //console.log("32");
    form.addEventListener('submit', async (event) => {
        //console.log(123)
        event.preventDefault();

        const nombreApodo = document.getElementById('nombre-apodo').value;
        const especie = document.getElementById('especie').value;
        const raza = document.getElementById('raza').value;
        const color = document.getElementById('color').value;
        const estadoSalud = document.getElementById('estado-salud').value;
        const anioNacimiento = document.getElementById('anio-nacimiento').value;

        const mascotasdata = {
            nombre_apodo: nombreApodo,
            especie,
            raza,
            color,
            estado_salud: estadoSalud,
            anio_nacimiento: anioNacimiento
        };

        try {
            const response = await fetch('http://localhost:3000/mascotas/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mascotasdata),
            });
            console.log(response);

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Registro exitoso: ' + data.message);
                form.reset();
                window.location.href = '../rescatista-pages/index_rescatistas.html';
            } else {
                alert('Error: ' + data.message || 'Error en el registro.');
            }
        } catch (error) {
            console.error('Error al registrar la mascota:', error);
            // document.querySelector('.error').style.display = 'block';
        }
    });