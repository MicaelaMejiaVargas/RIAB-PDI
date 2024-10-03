//libreria para encriptar
const bcryptjs = require('bcryptjs');
//libreria para tokens
const jwt = require('jsonwebtoken');
//libreria para acceder a las variables de entorno
const dotenv = require('dotenv');
dotenv.config({path: "../vars/.env"});

const salt = Number(process.env.SALT);

//Importamos modelo de Rescatistas
const Rescatista = require('../models/modelRescatistas');

const obtenerTodos = async (req, res) => {
    try {
      const Resc = await Rescatista.findAll();
      return res.json(Resc)
    } catch (error) {
      return res.json({err: error})
    }
}

const obtener = async (req, res) => {
  try {
    const { dni } = req.params
    const resc = await Rescatista.findByPk(dni);
  
    return res.status(200).json(resc) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const crear = async (req, res) => {
  try {
    const {dni, nombre, apellido, telefono, direccion, genero, email, passw, re_passw} = req.body

    //buscamos si el email ya está en uso en la base de datos
    const emailUsado = await Rescatista.findOne({ where: { email: email } });
    if (emailUsado) {
      return res.status(400).json({ error: "Email ya está en uso" });
    }

    //confirmar contraseña
    if (!re_passw) {
      return res.status(400).json({error: "El campo confirmar contraseña no puede estar vacío"});
    }else{
      if (passw !== re_passw) {
        return res.status(400).json({error: "Las contraseñas no coinciden"});
      }
    }

    //buscamos si el rescatista ya existe en la base de datos
    const existeResc = await Rescatista.findOne({ where: { dni } });
    if (existeResc) {
      return res.status(400).json({status: "Error", message: "Este Rescatista ya existe"});
    }

    //hasheo de contraseña
    const hashPassword = await bcryptjs.hash(passw, salt);

    //creacion del Rescatista
    const rescaNuevo = await Rescatista.create({ 
      dni, nombre, apellido, telefono, email, direccion, genero, passw:hashPassword
    });

    console.log(rescaNuevo);

    const RescaData = rescaNuevo.toJSON();
    delete RescaData.passw; // por seguridad borramos la contraseña del objeto que retorna nuestra Api

    return res.status(200).json({
      success: true,
      message: "Rescatista creado!",
      data: RescaData
    })

  } catch (error) {
    // retornamos las VALIDACIONES del Modelo "Rescatista" en formato json
     if (error.name === 'SequelizeValidationError') {
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ error: errores });
    }
    console.log(error);

    return res.status(500).json({ 
      success: false,
      error: "Internal Server Error" });
  }
}


module.exports = {
  obtenerTodos,
  obtener,
  crear
}