const mascota = require('../models/modelMascotas');

// Listas de opciones permitidas
const especiesPermitidas = ['perro', 'gato', 'loro', 'tortuga', 'conejo', 'pato'];
const razasPermitidas = {
    perro: ['labrador', 'bulldog', 'beagle', 'poodle', 'chihuahua', 'otro'],
    gato: ['persa', 'siamés', 'bengalí', 'maine coon', 'cruza', 'otro'],
    loro: ['cacatúa', 'loro gris', 'amazonas', 'agaporni', 'loro de sol', 'otro'],
    tortuga: ['tortuga de tierra', 'tortuga de agua', 'tortuga de estanque', 'tortuga gigante', 'otro'],
    conejo: ['holland lop', 'rex', 'angora', 'mini rex', 'lionhead', 'otro'],
    pato: ['pato pekinés', 'pato muscovy', 'pato rizado', 'pato cayuga', 'pato rouen', 'otro']
};

// Función de validación
const validarMascota = (data) => {
    const { nombre_apodo, especie, raza, color, anio_nacimiento } = data;

    // Validación del nombre_apodo
    if (!nombre_apodo || nombre_apodo.length < 2 || nombre_apodo.length > 50 || !/^[a-zA-Z\s]+$/.test(nombre_apodo)) {
        return "Nombre-apodo inválido. Solo se permiten letras y debe tener entre 2 y 50 caracteres.";
    }

    // Validación de especie
    if (!especiesPermitidas.includes(especie)) {
        return "Especie inválida. Debe ser una de las opciones permitidas: " + especiesPermitidas.join(", ") + ".";
    }

    // Validación de raza
    if (!razasPermitidas[especie] || !razasPermitidas[especie].includes(raza)) {
        return "Raza inválida. Debe ser una de las opciones permitidas o 'otro' para la especie seleccionada.";
    }

    // Validación de color
    if (!color || !/^[a-zA-Z\s]+$/.test(color)) {
        return "Color inválido. Solo se permiten letras.";
    }

    // Validación del año de nacimiento
    if (!anio_nacimiento || isNaN(anio_nacimiento) || 
        anio_nacimiento < 2000 || anio_nacimiento > 2024) {
        return "Año de nacimiento inválido. Debe estar entre 2000 y 2024.";
    }

    return null; // No hay errores
};

const obtenerMascotas = async (req, res) => {
    try {
        const masc = await mascota.findAll();
        return res.json(masc);
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const obtenerMascotasId = async (req, res) => {
    try {
        const { id } = req.params;
        const masc = await mascota.findByPk(id);

        if (!masc) {
            return res.status(404).json({ message: "Mascota no encontrada." });
        }

        return res.status(200).json(masc);
    } catch (error) {
        console.error('Error al obtener la mascota:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const crearMascotas = async (req, res) => {
    try {
        const error = validarMascota(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        const mascotaNuevo = await mascota.create(req.body);
        
        return res.status(201).json({
            success: true,
            message: "Mascota creada!",
            data: mascotaNuevo
        });
    } catch (error) {
        console.error('Error al crear mascota:', error);
        return res.status(500).json({ error: "Error al crear la mascota." });
    }
};

const actualizarMascotas = async (req, res) => {
    try {
        const pasarid = req.params.id;

        const error = validarMascota(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        const buscarMascota = await mascota.findOne({ where: { id: pasarid } });

        if (!buscarMascota) {
            return res.status(404).json({ message: "Mascota no encontrada." });
        }

        const actuMascota = await buscarMascota.update(req.body);
        
        return res.status(200).json({
            message: "Mascota actualizada con éxito!",
            data: actuMascota
        });
    } catch (error) {
        console.error('Error al actualizar la mascota:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const borrarMascotas = async (req, res) => {
    try {
        const id = req.params.id;
        const buscarMascota = await mascota.findOne({ where: { id } });

        if (!buscarMascota) {
            return res.status(404).json({ message: "Mascota no encontrada." });
        }

        await buscarMascota.destroy();
        return res.status(200).json({
            message: "Mascota eliminada con éxito!"
        });
    } catch (error) {
        console.error('Error al borrar la mascota:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    obtenerMascotas,
    obtenerMascotasId,
    crearMascotas,
    actualizarMascotas,
    borrarMascotas
};
