const mascotas = require('../models/mascotas');

// Crear una nueva mascota
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

// Obtener una mascota por ID
const getMascotaById = async (req, res) => {
  const { id } = req.params;
  try {
    const mascota = await mascotas.findByPk(id);
    if (!mascota) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      });
    }
    return res.status(200).json({
      success: true,
      data: mascota
    });
  } catch (error) {
    console.error('Error al obtener la mascota:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Actualizar una mascota
const updateMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await mascotas.update(req.body, {
      where: { id }
    });
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      });
    }
    const updatedMascota = await mascotas.findByPk(id);
    return res.status(200).json({
      success: true,
      message: 'Mascota actualizada exitosamente',
      mascota: updatedMascota
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.errors ? error.errors.map(e => e.message).join(', ') : 'Error al actualizar la mascota'
    });
  }
};

// Eliminar una mascota
const deleteMascota = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await mascotas.destroy({
      where: { id }
    });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Mascota no encontrada'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Mascota eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  crearMascotas,
  getAllMascotas,
  getMascotaById,
  updateMascota,
  deleteMascota
};
