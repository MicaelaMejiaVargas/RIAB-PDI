//libreria para encriptar
const bcryptjs = require('bcryptjs');
//libreria para tokens
const jwt = require('jsonwebtoken');
//libreria para acceder a las variables de entorno
const dotenv = require('dotenv');
dotenv.config({path: "./vars/.env"});

const salt = Number(process.env.SALT);

const validaResc = /^[A-Za-z\d]{5,}$/;
const validaEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
const validaContra = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"'])[A-Za-z\d!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"']{8,}$/;

//Importamos modelo de Rescatistas
const Rescatista = require('../models/modelRescatistas');

const obtenerTodos = async (req, res) => {
    try {
      const Resc = await Rescatista.findAll()
      return res.json(Resc)
    } catch (error) {
      return res.json({err: error})
    }
}
