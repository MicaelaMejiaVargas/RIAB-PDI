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
  
    if (!resc) {
      return res.status(404).json({
        ok: false,
        success: false,
        error: "Rescatista no encontrado"
      });
    }

    return res.status(200).json({
      ok: true,
      success: true,
      data: resc
    });
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

const login = async (req, res) => {
  try {
    const { dni, passw } = req.body;

    // validaciones en el login
    if (!dni) {
      return res.status(401).json({error: "DNI no puede estar vacio."})
    }else{
      if (dni.length < 8 || dni.length > 8) { 
        return res.status(401).json({error: "DNI inválido: debe tener 8 dígitos."})
      }
    }

    if (!passw) {
      return res.status(401).json({error: "La contrasena no puede estar vacía."})
    }

    //buscamos si el rescatista ya existe en la base de datos
    let existeResc = await Rescatista.findOne({where: {dni}});

    if (!existeResc) {
      existeResc = {passw: "122ñ"}
    }

    const correctPassw = bcryptjs.compareSync(passw, existeResc.passw);
    if (!correctPassw) {
      return res.status(404).json({error:"Contraseña o DNI incorrectos."});
    }

    const rescatistaT = existeResc.toJSON();
    delete rescatistaT.passw;
    
    // creación del token
    const token = jwt.sign(rescatistaT, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION});

    // configuración del token
    res.cookie("token",token,{
      httpOnly: true,
      sameSite: "none",
    })

    return res.status(200).json({
      ok: true,
      success: true,
      message: "Inicio de sesión exitoso", 
      data: {rescatistaT, token}
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"})
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({ message: "Rescatista deslogueado exitosamente!!"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const actualizar = async (req, res) => {
  try {
    const { nombre, apellido, telefono, direccion, genero, email, passw } = req.body;
    const {dni} = req.params;

    const existResc = await Rescatista.findByPk(dni);
    if (!existResc) {
      return res.status(404).json({ error: "Rescatista no encontrado" });
    }

    const emailUsado = await Rescatista.findOne({ where: { email: email } });
    if (emailUsado && emailUsado.dni != dni) {
      return res.status(409).json({ error: "Este Email ya está en uso" });
    }

    const hashPassword = await bcryptjs.hash(passw, salt)

    existResc.nombre = nombre;
    existResc.apellido = apellido;
    existResc.telefono = telefono;
    existResc.direccion = direccion;
    existResc.genero = genero;
    existResc.email = email;
    existResc.passw = hashPassword;

    await existResc.save();

    const datosRescatista = existResc.toJSON();
    delete datosRescatista.passw;

    return res.status(200).json({ message: "Rescatista actualizado exitosamente", data: datosRescatista});
  } catch (error) {
    // retornamos las VALIDACIONES del Modelo "Rescatista" en formato json
    if (error.name === 'SequelizeValidationError') {
      const errores = error.errors.map(err => err.message);
      return res.status(400).json({ error: errores });
    }

    console.log(error);
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const borrar = async (req, res) => {
  try {
    const dni = req.params.dni;

    const existeResc = await Rescatista.findByPk(dni);
    if (!existeResc) {
      return res.status(404).json({ error: "Rescatista no encontrado" });
    }

    await Rescatista.destroy({ where: { dni: dni } });
    res.clearCookie("token");

    return res.status(200).json({ message: "Rescatista borrado con exito", data: existeResc});
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"})
  }
}

module.exports = {
  obtenerTodos,
  obtener,
  crear,
  login,
  logout,
  actualizar,
  borrar
}