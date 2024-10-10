const mascotas = require('../models/mascotas');

const crearMascotas = async (req, res) => {
  try {
    const nuevaMascota = await mascotas.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Mascota registrada exitosamente',
      mascota: nuevaMascota
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors ? error.errors.map(e => e.message).join(', ') : 'Error al registrar la mascota'
    });
  }
};

// Obtener todas las mascotas
const getAllMascotas = async (req, res) => {
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

// Exportar funciones del controlador
module.exports = {
  crearMascotas,
  getAllMascotas
};
