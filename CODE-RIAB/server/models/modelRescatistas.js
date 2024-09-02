const { Sequelize } = require('sequelize');
const db = require('../config/db_sequelize');

/**
 * Modelo de los Rescatistas que se almacenan en la base de datos.
 * @property {number} codigo_r - codigo del Rescatista.
 * @property {number} dni - DNI del Rescatista.
 * @property {string} nombre - El nombre del rescatista.
 * @property {string} apellido - El apellido del rescatista.
 * @property {string} direccion - La direccion del rescatista.
 * @property {boolean} completed - Estado de la tarea.
 */
const Rescatista = db.define('Rescatista', {
  codigo_r:{
    type: Sequelize.INTEGER(4),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  dni: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    validate: {
      isInt: {
        msg: 'El DNI debe ser un número entero'
      },
      notEmpty: { 
        msg: 'Este campo No puede estar vacio' 
      },
      validarDni(value) {
        if (!value || value.length < 8) {
          throw new Error('DNI inválido! Debe tener al menos 8 digitos.');
        }
        if (value.length > 8){
          throw new Error('DNI inválido! El dni tiene demasiados dígitos.')
        }
      }
    }
  },
  nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          len: {
            args: [3, 50],
            msg: 'Nombre inválido: debe tener entre 3 y 50 caracteres'
          },
          notEmpty: true
      }
  },
  apellido: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          len: {
            args: [3, 50],
            msg: 'Apellido inválido: debe tener entre 3 y 50 caracteres'
          },
          notEmpty: true
      }
    
  },
  telefono: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'El teléfono debe contener solo números'
        },
        len: {
          args: [7, 15],
          msg: 'Número de Teléfono inválido: debe tener entre 7 y 15 caracteres'
        },
        notEmpty: true
      }
  }, 
  email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          isEmail: {
            msg: "Formato de email inválido."
          },
          notEmpty: true
      }
  },
  direccion: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Este campo no puede estar vacío'
        },
        len: {
          args: [0, 255],
          msg: 'Dirección inválida: máximo 255 caracteres'
        }
      }
  },
  genero: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isIn: {
          args: [['M', 'F', 'Otro']],
          msg: 'Género inválido: debe ser Masculino, Femenino u Otro'
        }
      }
  },
  passw: {
    type: Sequelize.STRING,
    allowNull:false,
    validate: {
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
    }
  },
  r_passw: {
    type: Sequelize.STRING,
    allowNull:false,
    validate: {
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
    }
  }
}, {
  timestamps: false
})

Rescatista.sync({ force: false })
  .then(() => {
    console.log('Modelo de Rescatista sincronizado correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar el Modelo de Rescatista:', err);
  }
);

module.exports = Rescatista;
