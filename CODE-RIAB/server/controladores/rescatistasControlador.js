//libreria para encriptar
const bcryptjs = require('bcryptjs');
//libreria para tokens
const jsonwebtoken = require('jsonwebtoken');
//libreria para acceder a las variables de entorno
const dotenv = require('dotenv');

dotenv.config({path: "./vars/.env"});

// Importamos modelo de Rescatistas
const Rescatista = require('../models/modelRescatistas');

const obtenerTodos = async (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  try {
    const Resc = await Rescatista.findAll()
    return res.json(Resc)
  } catch (error) {
    return res.json({err: error})
  }
}

const obtener = async (req, res) => {
  try {
    const { codigo_r } = req.params
    const resc = await Rescatista.findByPk(codigo_r)
  
    return res.status(200).json(resc) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const crear = async (req, res) => {
  try {
    const {dni, nombre, apellido, telefono, email, direccion, genero, passw, r_passw } = req.body

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

    //buscamos si el rescatista ya existe en la base de datos
    const existeResc = await Rescatista.findOne({ where: { dni } });

    if (existeResc) {
      return res.status(400).json({status: "Error", message: "Este Rescatista ya existe"});
    }

    const hashPassword = await bcryptjs.hash(passw,5);
    const hashPass2 = await bcryptjs.hash(r_passw,5);

    const rescaNuevo = await Rescatista.create({ 
      dni, nombre, apellido, telefono, email, direccion, genero, passw:hashPassword, r_passw:hashPass2
    });
    rescaNuevo.save();

    console.log(rescaNuevo);

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

const actualizar = async (req, res) => {
  try {
    const pasarDni = req.params.dni;
    const {dni, nombre, apellido, telefono, email, direccion, genero, passw, r_passw } = req.body;

    const buscarResc = await Rescatista.findOne({ where: { dni: pasarDni } });

    if(!buscarResc){
      return res.status(400).json({
        message: "Rescatista no encontrado."
      });
    }

    const actResc = await buscarResc.update({dni, nombre, apellido, telefono, email, direccion, genero, passw, r_passw});
    
    return res.status(200).json({
      message: "Rescatista actualizado!",
      data: actResc
    })
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
};

const borrar = async (req, res) => {
  try {
    const dni= req.params.dni
    const buscarResc = await Rescatista.findOne({where: {dni}});

    if(!buscarResc){
      return res.status(404).json({ message: "Rescatista no encontrado."});
    }

    const borrarResc = await buscarResc.destroy();
    return res.status(200).json({
      message: "Rescatista Borrado con exito!",
      data: borrarResc
    })
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const login = async (req,res) => {
  try {
    const {dni,passw} = req.body

    if (!dni || dni.length < 8) { 
      return res.status(401).json({error: "DNI inválido"})
    }
    if (!passw) {
      return res.status(401).json({error: "La contraseña no puede estar vacía."})
    }

    //buscamos si el rescatista ya existe en la base de datos
    const existeResc = await Rescatista.findOne({ where: { dni } });

    if (!existeResc) {
      return res.status(400).json({status: "Error", message: "Error durante el login"});
    }

    const contraCorrect = await bcryptjs.compare(passw, existeResc.passw);

    console.log(contraCorrect);

    if(!contraCorrect){
        return res.status(400).json({status: "Error", message: "Error durante el login."});
    }

    //creamos tokens
    const token = jsonwebtoken.sign(
      {dni:existeResc.dni},
      process.env.JWT_SECRET,
      {expiresIn: process.env.JWT_EXPIRATION}
    ); 

    //configuramos cookies
    const cookieOption = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    console.log('Cookie will be set:', token); 

    res.cookie("jwt",token,cookieOption);

    console.log('Cookie set successfully');

    return res
    .status(200)
    .json({
      status: "ok",
      success: true,
      message: "Inicio de sesión exitoso",
      redirect: "/admin"
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
  crear,
  actualizar,
  borrar,
  login
}