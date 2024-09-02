const Rescatista = require('../models/modelRescatistas');

const soloRescatistas = async (req, res, next) => {

    const existeResc = await Rescatista.findOne({ where: { dni } });
    if(existeResc) return next();
    return res.redirect("/");
}

const soloPersonas = async (req, res, next) => {
    const existeResc = await Rescatista.findOne({ where: { dni } });
    if(!existeResc) return next();
    return res.redirect("/personas");
}

module.exports = {
    soloRescatistas,
    soloPersonas
}