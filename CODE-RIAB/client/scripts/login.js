document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-login');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('input', () => {
        const isValid = form.checkValidity();
        submitButton.disabled = !isValid;
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const dni = document.getElementById('dni').value;
        const passw = document.getElementById('passw').value;

        const rescatistaData = {
            dni,
            passw
        };

        try {
            const response = await fetch('http://localhost:3000/rescatistas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rescatistaData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Inicio de Sesión exitoso: ' + data.message);
                form.reset();
                window.location.href = '../pages/login.html';
            } else {
                alert('Error: ' + data.message || 'Error en el registro.');
            }
        } catch (error) {
            console.error('Error al registrar el rescatista:', error);
            document.querySelector('.error').style.display = 'block';
        }
    });
});
