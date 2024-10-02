// Importamos modelo de mascotas
const mascota = require('../models/modelMascotas');

//funcion de validacion
const validarMascota = (data) => {
  const { nombre_apodo, especie, raza, color, estado_salud, anio_nacimiento } = data;
  
  if (!nombre_apodo || nombre_apodo.length < 2 || nombre_apodo.length > 50 || !/^[a-zA-Z\s]+$/.test(nombre_apodo)) {
    return "Nombre-apodo invalido. Solo se permiten letras.";
  }
  if (!especie || especie.length < 2 || especie.length > 50 || !/^[a-zA-Z\s]+$/.test(especie)) {
    return "Especie invalida. Solo se permiten letras.";
  }
  if (!raza || raza.length < 2 || raza.length > 50 || !/^[a-zA-Z\s]+$/.test(raza)) {
    return "Raza invalida. Solo se permiten letras.";
  }
  if (!color || color.length < 2 || color.length > 30 || !/^[a-zA-Z\s]+$/.test(color)) {
    return "Color invalido. Solo se permiten letras.";
  }
  if (!estado_salud || estado_salud.length < 5 || !/^[a-zA-Z\s]+$/.test(estado_salud)) {
    return "Estado de salud invalido. Solo se permiten letras y debe tener al menos 5 caracteres.";
  }
  if (!anio_nacimiento || isNaN(anio_nacimiento) || anio_nacimiento < 1900 || anio_nacimiento > new Date().getFullYear()) {
    return "Anio de nacimiento invalido.";
  }
  return null; // No hay errores
};

const obtenerMascotas = async (req, res) => {
  try {
    const masc = await mascota.findAll();
    return res.json(masc);
  } catch (error) {
    return res.status(500).json({ err: "Internal Server Error" });
  }
}

const obtenerMascotasId = async (req, res) => {
  try {
    const { id } = req.params;
    const masc = await mascota.findByPk(id);

    if (!masc) {
      return res.status(404).json({ message: "Mascota no encontrada." });
    }
  
    return res.status(200).json(masc);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const crearMascotas = async (req, res) => {
  try {
    const {nombre_apodo, especie,  raza, color, estado_salud, anio_nacimiento } = req.body;
    
    const error = validarMascota(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const mascotaNuevo = await mascota.create({ 
      nombre_apodo, especie, raza, color, estado_salud, anio_nacimiento 
    });

    console.log(mascotaNuevo);

    mascotaNuevo.save();

    return res.status(201).json({
      success: true,
      message: "Mascota creada!",
      data: mascotaNuevo
    });

  } catch (error) {
    return console.error(error);
    // return res.status(500).json({ 
    //   success: false,
    //   error: "Internal Server Error" });
  }
};

const actualizarMascotas = async (req, res) => {
  try {
    const pasarid = req.params.id;
    const { nombre_apodo, especie, raza, color, estado_salud, anio_nacimiento } = req.body;

    const error = validarMascota(req.body);
    if (error) {
      return res.status(400).json({ error });
    }

    const buscarMascota = await mascota.findOne({ where: { id: pasarid } });

    if (!buscarMascota) {
      return res.status(404).json({ message: "Mascota no encontrada." });
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
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  obtenerMascotas,
  obtenerMascotasId,
  crearMascotas,
  actualizarMascotas,
  borrarMascotas
}
