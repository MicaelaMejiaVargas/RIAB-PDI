const Historial = require('../models/modelHistorial');

const soloRescatistas = async (req, res, next) => {
    const { dni } = req.params
    const existeResc = await Rescatista.findOne({ where: { dni } });
    if(existeResc) return next();
    return res.redirect("/personas");
}

const soloPersonas = async (req, res, next) => {
    const { dni } = req.params
    const existeResc = await Rescatista.findOne({ where: { dni } });
    if(!existeResc) return next();
    return res.redirect("/rescatistas");
}

module.exports = {
    soloRescatistas,
    soloPersonas
}