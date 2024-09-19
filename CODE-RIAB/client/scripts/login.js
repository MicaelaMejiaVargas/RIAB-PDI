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
            const response = await fetch('http://localhost:3000/rescatistas/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rescatistaData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(data.message);
                // form.reset();
                // window.location.href = '../rescatista-pages/index_rescatistas.html';
        
            } else {
                alert('Error: ' + data.message || 'Error al iniciar sesion.');
            }
        } catch (error) {
            console.error('Error al iniciar sesion :c ', error);
            document.querySelector('.error').style.display = 'block';
        }
    });
});
