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
 */

// Definir la estructura de la tabla rescatista
const Rescatista = db.define('rescatistas', {
  dni: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    unique: true,
    validate: {
      isInt: {
        msg: 'El DNI debe ser un número entero'
      },
      notEmpty: { 
        msg: 'Este campo no puede estar vacío' 
      },
      validarDni(value) {
        const dniString = String(value);
        if (dniString.length < 8) {
          throw new Error('DNI inválido: debe tener 8 dígitos.');
        }
        if (dniString.length > 8) {
          throw new Error('DNI inválido: tiene demasiados dígitos.');
        }
      }
    }
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2],
        msg: 'Nombre inválido: debe tener más de 2 caracteres'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
      isAlpha: {
        msg: 'El nombre solo debe contener letras'
      }
    }
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2],
        msg: 'Apellido inválido: debe tener más de 2 caracteres'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
      isAlpha: {
        msg: 'El apellido solo debe contener letras'
      }
    }
  },
  telefono: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: 'El teléfono debe contener solo números'
      },
      len: {
        args: [7, 15],
        msg: 'Número de Teléfono inválido: debe tener entre 7 y 15 caracteres'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      }
    }
  }, 
  direccion: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: {
        args: /^[a-zA-Z0-9\s,.#-]+$/i,
        msg: 'La dirección contiene caracteres no permitidos'
      },
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
      len: {
        args: [1, 255],
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
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
      isEmail: {
        msg: 'El correo electrónico no es válido'
      }
    }
  },
  passw: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Este campo no puede estar vacío'
      },
      len: {
        args: [8, 100],
        msg: 'La contraseña debe tener al menos 8 caracteres'
      },
      validaPassw(valor) {
        if (!/[A-Z]/.test(valor)) {
          throw new Error('La contraseña debe contener al menos una letra mayúscula');
        }
        if (!/[a-z]/.test(valor)) {
          throw new Error('La contraseña debe contener al menos una letra minúscula');
        }
        if (!/\d/.test(valor)) {
          throw new Error('La contraseña debe contener al menos un número');
        }
        if (!/[!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"']/.test(valor)) {
          throw new Error('La contraseña debe contener al menos un carácter especial');
        }
      }
    }
  }
}, {
  timestamps: false
});

Rescatista.sync({ force: false })
  .then(() => {
    console.log('Modelo de Rescatista sincronizado correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar el Modelo de Rescatista:', err);
  });

module.exports = Rescatista;