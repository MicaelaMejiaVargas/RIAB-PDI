const express = require("express");
const app = express();
require("dotenv").config(); //Modulo de dependencia que carga las variables de entorno desde un archivo
const multer = require("multer"); //Middleware que se utiliza para la subida de archivos
const cloudinary = require("cloudinary").v2;

const upload = multer({dest : 'uploads'});

const port = 3000;

app.get("/",(req, res) => {
    res.send("prueba");
});

 app.post("/upload", upload.single('image'), async (req, res) => {
     try{
         const resultado = await cloudinary.uploader.upload(req.file.path);
         res.status(200).json(resultado);
     } catch(error){
         console.log('error', error);
         res.status(400).send(error.message);
     }
 });

app.listen(port, () => {
    console.log("Running in port", port);
});