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
    const { especie, nombre_apodo, raza, color, estado_salud, anio_nacimiento } = req.body;

    // --- Validaciones Mascotas ---
    if (!nombre_apodo || nombre_apodo.length < 2 || nombre_apodo.length > 50 || !/^[a-zA-Z\s]+$/.test(nombre_apodo)) {
      return res.status(401).json({ error: "Nombre-apodo invalido. Solo se permiten letras." });
    }
    if (!especie || especie.length < 2 || especie.length > 50 || !/^[a-zA-Z\s]+$/.test(especie)) {
      return res.status(401).json({ error: "Especie invalido. Solo se permiten letras." });
    }
    if (!raza || raza.length < 2 || raza.length > 50 || !/^[a-zA-Z\s]+$/.test(raza)) {
      return res.status(401).json({ error: "Raza invalido. Solo se permiten letras." });
    }
    if (!color || color.length < 2 || color.length > 30 || !/^[a-zA-Z\s]+$/.test(color)) {
      return res.status(401).json({ error: "Color invalido. Solo se permiten letras." });
    }
    if (!estado_salud || estado_salud.length < 5 || !/^[a-zA-Z\s]+$/.test(estado_salud)) {
      return res.status(401).json({ error: "Estado de salud invalido. Solo se permiten letras y debe tener al menos 5 caracteres." });
    }
    if (!anio_nacimiento || isNaN(anio_nacimiento) || anio_nacimiento < 1900 || anio_nacimiento > new Date().getFullYear()) {
      return res.status(401).json({ error: "Año de nacimiento invalido" });
    }

    const mascotaNuevo = await mascota.create({ 
      nombre_apodo, especie, raza, color, estado_salud, anio_nacimiento 
    });

    return res.status(200).json({
      message: "Mascota creada!",
      data: mascotaNuevo
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const actualizarMascotas = async (req, res) => {
  try {
    const pasarid = req.params.id;
    
    const { nombre_apodo, especie, raza, color, estado_salud, anio_nacimiento } = req.body;

    // --- Validaciones Mascotas ---
    if (!nombre_apodo || nombre_apodo.length < 2 || nombre_apodo.length > 50 || !/^[a-zA-Z\s]+$/.test(nombre_apodo)) {
      return res.status(401).json({ error: "Nombre-apodo invalido. Solo se permiten letras." });
    }
    if (!especie || especie.length < 2 || especie.length > 50 || !/^[a-zA-Z\s]+$/.test(especie)) {
      return res.status(401).json({ error: "Especie invalido. Solo se permiten letras." });
    }
    if (!raza || raza.length < 2 || raza.length > 50 || !/^[a-zA-Z\s]+$/.test(raza)) {
      return res.status(401).json({ error: "Raza invalido. Solo se permiten letras." });
    }
    if (!color || color.length < 2 || color.length > 30 || !/^[a-zA-Z\s]+$/.test(color)) {
      return res.status(401).json({ error: "Color invalido. Solo se permiten letras." });
    }
    if (!estado_salud || estado_salud.length < 5 || !/^[a-zA-Z\s]+$/.test(estado_salud)) {
      return res.status(401).json({ error: "Estado de salud invalido. Solo se permiten letras y debe tener al menos 5 caracteres." });
    }
    if (!anio_nacimiento || isNaN(anio_nacimiento) || anio_nacimiento < 1900 || anio_nacimiento > new Date().getFullYear()) {
      return res.status(401).json({ error: "Año de nacimiento invalido" });
    }

    const buscarMascota = await mascota.findOne({ where: { id: pasarid } });

    if (!buscarMascota) {
      return res.status(404).json({
        message: "Mascota no encontrada."
      });
    }

    const actuMascota = await buscarMascota.update({
      nombre_apodo, especie, raza, color, estado_salud, anio_nacimiento 
    });
    
    return res.status(200).json({
      message: "Mascota actualizada con éxito!",
      data: actuMascota
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
    const actuMascota = await buscarMascota.update({
        id, nombre_apodo, especie, raza, color,estado_salud, anio_nacimiento 
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