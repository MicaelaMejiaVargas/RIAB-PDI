const token = localStorage.getItem("token"); 

//función para decodificar el payload del token JWT y extraer el DNI
const getDniFromToken = (token) => {
    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));

        return decodedPayload.dni;
    } catch (error) {
        console.error('Error decodificando el token:', error);
        return null;
    }
};

const dni = getDniFromToken(token); 

const app = "http://localhost:3000";

const traerDatos = async () => {
    try { //luego cambiar el localhost a riab-api.vercel.app, por el momento dejarlo asi
        const response = await fetch(`${app}/rescatistas/${dni}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // "Access-Control-Allow-Origin": "https://localhost:5500",
                "Access-Control-Allow-Credentials": true,
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log(data.data);
        } else {
            alert('Error: ' + data.error);
        }
    } catch (error) {
        console.error('Error: ', error);
    }
}

traerDatos();
