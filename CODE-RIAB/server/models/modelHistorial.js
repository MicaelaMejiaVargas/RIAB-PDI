const { Sequelize } = require('sequelize');
const sequelize = require('../config/db_sequelize');

// Definir la estructura del producto
const Historial = sequelize.define('Historial', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    validate: {  
        isInt: true, //tiene que ser entero
        allowNull: false,
      }
  },
  castrado: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: {
          msg: 'Este campo no puede estar vacío'
        }
    }
  },
  operado: {
    type: Sequelize.STRING,
    validate: {  
        notEmpty: {
            msg: 'Ingrese algo, el campo no puede estar vacio'
          }
      }
  },
  discapacidad: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: {
          msg: 'Ingrese algo, el campo no puede estar vacio'
        }
      }
  },
  rabia: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: {
          msg: 'Ingrese algo, el campo no puede estar vacio'
        }
      }
  },
  enfermedades: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: {
          msg: 'Ingrese algo, el campo no puede estar vacio'
        }
      }
  },
  desparasitados: {
    type: Sequelize.STRING,
    validate: {
        notEmpty: {
          msg: 'Ingrese algo, el campo no puede estar vacio'
        }
      }
  },
}, {
  timestamps: false
})

Historial.sync({ force: false })
  .then(() => {
    console.log('Modelo del Historial Medico sincronizado correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar el Modelo del Historial Medico:', err);
  });

module.exports = Historial;