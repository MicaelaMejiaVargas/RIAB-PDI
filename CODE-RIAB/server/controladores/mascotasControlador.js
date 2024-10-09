const mascotas = require('../models/mascotas'); // Asegúrate de que la ruta sea correcta

// Crear nueva mascota
exports.createMascota = async (req, res) => {
    const { nombre_apodo, especie, raza, color, anio_nacimiento } = req.body;

    try {
        const nuevaMascota = await mascotas.create({
            nombre_apodo,
            especie,
            raza,
            color,
            anio_nacimiento
        });

        return res.status(201).json({
            success: true,
            message: 'Mascota registrada exitosamente',
            data: nuevaMascota
        });
    } catch (error) {
        console.error('Error al registrar la mascota:', error);

        // Manejo de errores
        const errorMessages = error.errors.map(err => err.message);
        return res.status(400).json({
            success: false,
            message: 'Error al registrar la mascota',
            errors: errorMessages
        });
    }
};

// Obtener todas las mascotas (opcional, si necesitas esta función)
exports.getAllMascotas = async (req, res) => {
    try {
        const listaMascotas = await mascotas.findAll();
        return res.status(200).json({
            success: true,
            data: listaMascotas
        });
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};
