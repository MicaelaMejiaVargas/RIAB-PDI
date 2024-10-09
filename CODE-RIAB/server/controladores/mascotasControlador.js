const mascota = require('../models/modelMascotas');

// Listas de opciones permitidas
const especiesPermitidas = ['perro', 'gato', 'loro', 'tortuga', 'conejo', 'pato'];
const razasPermitidas = {
    perro: ['labrador', 'bulldog', 'beagle', 'poodle', 'chihuahua'],
    gato: ['persa', 'siamés', 'bengalí', 'maine coon', 'cruza'],
    loro: ['cacatúa', 'loro gris', 'amazonas', 'agaporni', 'loro de sol'],
    tortuga: ['tortuga de tierra', 'tortuga de agua', 'tortuga de estanque', 'tortuga de canoa', 'tortuga gigante'],
    conejo: ['holland lop', 'rex', 'angora', 'mini rex', 'lionhead'],
    pato: ['pato pekinés', 'pato muscovy', 'pato rizado', 'pato cayuga', 'pato rouen']
};

// Función de validación
const validarMascota = (data) => {
  const { nombre_apodo, especie, raza, color, anio_nacimiento } = data;

  // Validación del nombre_apodo
  if (!nombre_apodo || nombre_apodo.length < 2 || nombre_apodo.length > 50 || !/^[a-zA-Z\s]+$/.test(nombre_apodo)) {
      return "Nombre-apodo inválido. Solo se permiten letras.";
  }

  // Validación de especie
  if (!especiesPermitidas.includes(especie)) {
      return "Especie inválida. Debe ser una de las opciones permitidas.";
  }

  // Validación de raza
  if ((razasPermitidas[especie] && !razasPermitidas[especie].includes(raza)) && raza !== "otro") {
      return "Raza inválida. Debe ser una de las opciones permitidas o 'otro'.";
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

// Obtener todas las mascotas
const obtenerMascotas = async (req, res) => {
    try {
        const masc = await mascota.findAll();
        return res.json(masc);
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Obtener mascota por ID
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

// Crear nueva mascota
const crearMascotas = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Para verificar los datos recibidos
        const error = validarMascota(req.body);
        if (error) {
            return res.status(400).json({ error });
        }

        const mascotaNueva = await mascota.create(req.body);
        
        return res.status(201).json({
            success: true,
            message: "Mascota creada!",
            data: mascotaNueva
        });
    } catch (error) {
        console.error('Error al crear mascota:', error);
        return res.status(500).json({ error: "Error al crear la mascota." });
    }
};

// Actualizar mascota
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
        console.error('Error al actualizar mascota:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Borrar mascota
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
        console.error('Error al eliminar mascota:', error);
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
