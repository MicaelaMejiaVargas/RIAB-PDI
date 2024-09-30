const { Sequelize } = require('sequelize');
const db = require('../config/db');

/**
 * Modelo de los Rescatistas que se almacenan en la base de datos.
 * @property {number} dni - DNI del Rescatista.
 * @property {string} nombre - El nombre del rescatista.
 * @property {string} apellido - El apellido del rescatista.
 * @property {number} telefono - telefono del Rescatista.
 * @property {string} direccion - La direccion del rescatista.
 * @property {string} genero - género del rescatista.
 * @property {string} email - El correo electronico del rescatista.
 * @property {string} passw - contraseña de la cuenta del rescatista.
 * @property {string} re_passw - confirmar contraseña de la cuenta del rescatista.
 */

// Definir la estructura de la tabla rescatista
const Rescatista = db.define('rescatistas', {
  dni: {
    type: Sequelize.INTEGER(8),
    primaryKey: true,
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
            args: [3,],
            msg: 'Nombre inválido: debe tener mas de 3 caracteres'
          },
          notEmpty: true
      }
  },
  apellido: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
          len: {
            args: [3,],
            msg: 'Apellido inválido: debe tener mas de 3 caracteres'
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
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
        isEmail: true,
        notEmpty: true
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
  // re_passw: {
  //   type: Sequelize.STRING,
  //   allowNull:false,
  //   validate: {
  //     notEmpty: {
  //       msg: 'Este campo no puede estar vacío'
  //     },
  //   }
  // }
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
