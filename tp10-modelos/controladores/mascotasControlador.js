// const promiseQuery = require('../config/db');

// Importamos modelo de mascotas
const mascota = require('../models/modelMascotas');

const obtenerMascotas = async (req, res) => {
  // Obtiene todos las mascotas de la base de datos
  try {
    const masc = await mascota.findAll()
    return res.json(masc)
  } catch (error) {
    return res.json({err: error})
  }
}

const obtenerMascotasId = async (req, res) => {
  try {
    const { id } = req.params
    const masc = await mascota.findByPk(id)
  
    return res.status(200).json(masc) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const crearMascotas = async (req, res) => {
  try {
    const { id, nombre_apodo, raza, color, estado_salud, anio_nacimiento } = req.body

    // --- Validaciones Mascotas ---
    if (!id || id.length < 5) {
      return res.status(401).json({error: "id inválido"})
    }
    if (!nombre_apodo || nombre_apodo.length < 2) {
      return res.status(401).json({error: "Nombre-apodo inválido"})
    }
    if (!raza || raza.length < 2) {
      return res.status(401).json({error: "raza inválido"})
    }
    if (!color || color.length < 2) {
        return res.status(401).json({error: "color inválido"})
    }
    if (!estado_salud || estado_salud.length < 5) {
        return res.status(401).json({error: "explica un poco mas sobre su estado de salud"})
    }
    if (isNaN(anio_nacimiento)) {
      return res.status(401).json({error: "Número de año de nacimiento inválido"})
    }

    const mascotaNuevo = await mascota.create({ 
      id, nombre_apodo, raza, color, estado_salud, anio_nacimiento
    });
    mascotaNuevo.save();

    return res.status(200).json({
      message: "mascota creado!",
      data: mascotaNuevo
    })

  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const actualizarMascotas = async (req, res) => {
  try {
    const pasarid = req.params.id;
    
    const {id, nombre_apodo, raza, color,estado_salud, anio_nacimiento } = req.body;

    const buscarMascota = await mascota.findOne({ where: { id: pasarid } });

    if(!buscarMascota){
      return res.status(400).json({
        message: "mascota no encontrado."
      });
    }

    const actuMascota = await buscarMascota.update({
        id, nombre_apodo, raza, color,estado_salud, anio_nacimiento 
    });
    
    return res.status(200).json({
      message: "mascota actualizado!",
      data: actuMascota
    })
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
};

const borrarMascotas = async (req, res) => {
  try {
    const id= req.params.id
    const buscarMascota = await mascota.findOne({where: {id}});

    if(!buscarMascota){
      return res.status(404).json({ message: "mascota no encontrada."});
    }

    const borrarmasc = await buscarMascota.destroy();
    return res.status(200).json({
      message: "mascota eliminada con exito!",
      data: borrarmasc
    })
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

module.exports = {
  obtenerMascotas,
  obtenerMascotasId,
  crearMascotas,
  actualizarMascotas,
  borrarMascotas
}