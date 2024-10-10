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

        try { //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
            const response = await fetch('http://localhost:3000/rescatistas/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // "Access-Control-Allow-Origin": "https:",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(rescatistaData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert(data.message);

                localStorage.setItem('token', data.data.token);

                form.reset();

                // window.location.href = 'https://riab-api.vercel.app/rescatistas/rescatistas.html';

                window.location.href = './rescatistas/rescatistas.html';
        
            } else {
                alert('Error: ' + data.error || 'Error al iniciar sesion.');
            }
        } catch (error) {
            console.error('Error al iniciar sesion :c ', error);
            document.querySelector('.error').style.display = 'block';
        }
    });
});

const veoContrasena = document.getElementById('mostrarPassw');
const inputContrasena = document.getElementById("passw");
let click = false;

veoContrasena.addEventListener('click', (e) => {
    if (!click) {
        inputContrasena.type = 'text';
        click = true;
    } else {
        inputContrasena.type = 'password';
        click = false;
    }
});
