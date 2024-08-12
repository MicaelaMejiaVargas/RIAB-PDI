// Importamos modelo de Personas
const persona = require('../models/modelPersonas');

const obtenerTodos = async (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  try {
    const person = await persona.findAll()
    return res.json(person)
  } catch (error) {
    return res.json({err: error})
  }
}

const obtener = async (req, res) => {
  try {
    const { dni } = req.params
    const person = await persona.findByPk(dni)
  
    return res.status(200).json(person) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const crear = async (req, res) => {
  try {
    const {dni, nombre, apellido, telefono, email, direccion, genero } = req.body

    // Validaciones
    if (!dni || dni.length < 8) { 
      return res.status(401).json({error: "DNI inválido"})
    }
    if (!nombre || nombre.length < 3) {
      return res.status(401).json({error: "Nombre inválido"})
    }
    if (!apellido || apellido.length < 3) {
      return res.status(401).json({error: "Apellido inválido"})
    }
    if (isNaN(telefono)) {
      return res.status(401).json({error: "Número de Telefono inválido"})
    }

    const nuevaPersona = await persona.create({ 
      dni, nombre, apellido, telefono, email, direccion, genero
    });
    nuevaPersona.save();

    return res.status(200).json({
      message: "Persona creada!",
      data: nuevaPersona
    })

  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const actualizar = async (req, res) => {
  try {
    const pasarDni = req.params.dni;
    const {dni, nombre, apellido, telefono, email, direccion, genero } = req.body;

    const buscarPersona = await persona.findOne({ where: { dni: pasarDni } });

    if(!buscarPersona){
      return res.status(400).json({
        message: "Persona no encontrada."
      });
    }

    const actPersona = await buscarPersona.update({nombre, apellido, telefono, email, direccion, genero});
    
    return res.status(200).json({
      message: "Persona actualizada!",
      data: actPersona
    })
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
};

const borrar = async (req, res) => {
  try {
    const dni= req.params.dni
    const buscarPersona = await persona.findOne({where: {dni}});

    if(!buscarPersona){
      return res.status(404).json({ message: "Persona no encontrada."});
    }

    const borrarPersona = await buscarPersona.destroy();
    return res.status(200).json({
      message: "Persona Borrada con exito!",
      data: borrarPersona
    })
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

module.exports = {
  obtenerTodos,
  obtener,
  crear,
  actualizar,
  borrar
}