const mascota = require('../models/modelMascotas');

// Listas de opciones permitidas
const especiesPermitidas = ['perro', 'gato', 'loro'];
const coloresPermitidos = ['negro', 'blanco', 'marrón', 'gris'];
const razasPermitidas = ['labrador', 'bulldog', 'persa'];

// Función de validación
const validarMascota = (data) => {
  const { nombre_apodo, especie, raza, color, anio_nacimiento } = data;

  // Validación del nombre_apodo
  if (!nombre_apodo || nombre_apodo.length < 2 || nombre_apodo.length > 50 || !/^[a-zA-Z\s]+$/.test(nombre_apodo)) {
    return "Nombre-apodo invalido. Solo se permiten letras.";
  }

  // Validación de especie
  if (!especiesPermitidas.includes(especie)) {
    return "Especie invalida. Debe ser una de las opciones permitidas.";
  }

  // Validación de raza
  if (!razasPermitidas.includes(raza)) {
    return "Raza invalida. Debe ser una de las opciones permitidas.";
  }

  // Validación de color
  if (!coloresPermitidos.includes(color)) {
    return "Color invalido. Debe ser uno de los colores permitidos.";
  }

  // Validación del año de nacimiento
  if (!anio_nacimiento || isNaN(anio_nacimiento) || 
      ![2000, 2001, 2002, 2003, 2004, 2005, 
        2006, 2007, 2008, 2009, 2010, 2011,
        2012, 2013, 2014, 2015, 2016, 
        2017, 2018, 2019, 2020, 2021, 2022, 2023, 
        2024].includes(anio_nacimiento)) {
    return "Anio de nacimiento invalido. Debe ser uno de los años permitidos.";
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
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const crearMascotas = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Para verificar los datos recibidos
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
};

module.exports = {
  obtenerMascotas,
  obtenerMascotasId,
  crearMascotas,
  actualizarMascotas,
  borrarMascotas
};
