//libreria para encriptar
const bcryptjs = require('bcryptjs');
//libreria para tokens
const jwt = require('jsonwebtoken');
//libreria para acceder a las variables de entorno
const dotenv = require('dotenv');
dotenv.config({path: "../vars/.env"});

const salt = Number(process.env.SALT);

const validaNomYApe = /^[A-Za-z\d]{3,}$/;
const validaEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
const validaContra = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"'])[A-Za-z\d!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"']{8,}$/;

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

    //validaciones
    if (!dni || dni.length < 8) { 
      return res.status(401).json({error: "DNI inválido"})
    }
    if (!nombre || !validaNomYApe.test(nombre)) {
      return res.status(401).json({error: "Nombre inválido"})
    }
    if (!apellido || !validaNomYApe.test(apellido)) {
      return res.status(401).json({error: "Apellido inválido"})
    }
    if (isNaN(telefono)) {
      return res.status(401).json({error: "Número de Telefono inválido"})
    }
    if (!email || !validaEmail.test(email)) {
      return res.status(401).json({error: "Email inválido"})
    }
    if (!passw || !validaContra.test(passw)) {
      return res.status(401).json({error: "Contraseña inválida"})
    }
    if (!re_passw){
      return res.status(401).json({error: "El campo confirmar contrasena no puede estar vacio"})
    }
    if (passw !== re_passw) {
      return res.status(400).json({error: "Las contraseñas no coinciden"});
    }

    //buscamos si el email ya está en uso
    const emailEnUso = await Rescatista.findOne({ where: { email: email } });
    if (emailEnUso) {
      return res.status(409).json({ error: "Email ya está en uso." });
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
    rescaNuevo.save();

    console.log(rescaNuevo);

    const RescaData = rescaNuevo.toJSON();
    delete RescaData.passw;

    return res.status(200).json({
      success: true,
      message: "Rescatista creado!",
      data: rescaNuevo
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"})
  }
}



module.exports = {
  obtenerTodos,
  obtener,
  crear
}