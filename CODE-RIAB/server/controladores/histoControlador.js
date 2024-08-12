// Importamos modelo de Rescatistas
const Historial = require('../models/modelHistorial');

const obtenerTodos = async (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  try {
    const Histo = await Historial.findAll()
    return res.json(Histo)
  } catch (error) {
    return res.json({err: error})
  }
}

const obtener = async (req, res) => {
  try {
    const { id } = req.params
    const histo = await Historial.findByPk(id)
  
    return res.status(200).json(histo) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const crear = async (req, res) => {
  try {
    const {id, castrado, operado, discapacidad, rabia, enfermedades, desparasitados } = req.body

    // Validaciones
    if (!id || id.length < id) { 
      return res.status(401).json({error: "ID inválido"})
    }
    if (!castrado || castrado.length < 1) {
      return res.status(401).json({error: "Campo inválido"})
    }
    if (!operado || operado.length < 1) {
      return res.status(401).json({error: "Campo inválido"})
    }
    if (!discapacidad || discapacidad.length < 1) {
      return res.status(401).json({error: "Campo inválido"})
    }
    if (!rabia || rabia.length < 1) {
      return res.status(401).json({error: "Campo inválido"})
    }
    if (!enfermedades || enfermedades.length < 1) {
      return res.status(401).json({error: "Campo inválido"})
    }
    if (!desparasitados || desparasitados.length < 1) {
      return res.status(401).json({error: "Campo inválido"})
    }

    const histoNuevo = await Historial.create({ 
        id, castrado, operado, discapacidad, rabia, enfermedades, desparasitados
    });
    histoNuevo.save();

    return res.status(200).json({
      message: "Historial creado!",
      data: histoNuevo
    })

  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const actualizar = async (req, res) => {
  try {
    const pasarId = req.params.id;
    const {id, castrado, operado, discapacidad, rabia, enfermedades, desparasitados} = req.body;

    const buscarHisto = await Historial.findOne({ where: { id: pasarId } });

    if(!buscarHisto){
      return res.status(400).json({
        message: "Historial no encontrado."
      });
    }

    const actHisto = await buscarHisto.update({id, castrado, operado, discapacidad, rabia, enfermedades, desparasitados});
    
    return res.status(200).json({
      message: "Historial actualizado!",
      data: actHisto
    })
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
};

const borrar = async (req, res) => {
  try {
    const id= req.params.id
    const buscarHisto = await Historial.findOne({where: {id}});

    if(!buscarHisto){
      return res.status(404).json({ message: "Historial no encontrado."});
    }

    const borrarHisto = await buscarHisto.destroy();
    return res.status(200).json({
      message: "Historial Borrado con exito!",
      data: borrarResc
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