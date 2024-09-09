const Historial = require('../models/modelHistorial');

const soloRescatistas = async (req, res, next) => {
    const { dni } = req.params
    const existeResc = await Rescatista.findOne({ where: { dni } });
    if(existeResc) return next();
    return res.redirect("/personas");
}

const soloMascotas = async (req, res, next) => {
    const { id } = req.params
    const existeMasc = await mascotas.findOne({where: { id }});
}

module.exports = {
    soloRescatistas,
    soloMascotas
}