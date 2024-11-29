import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        validate: {
            isUUID: 4
        }
    },
    documento: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: {
            msg: 'Este documento ya está registrado'
        },
        validate: {
            notEmpty: {
                msg: 'El documento no puede estar vacío'
            },
            len: {
                args: [3, 30],
                msg: 'El documento debe tener entre 3 y 30 caracteres'
            },
            isAlphanumeric: {
                msg: 'El documento solo puede contener letras y números'
            },
            notOnlySpaces(value) {
                if (value.trim().length === 0) {
                    throw new Error('El documento no puede contener solo espacios');
                }
            }
        }
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre no puede estar vacío'
            },
            len: {
                args: [2, 50],
                msg: 'El nombre debe tener entre 2 y 50 caracteres'
            },
            is: {
                args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                msg: 'El nombre solo puede contener letras y espacios'
            },
            notOnlySpaces(value) {
                if (value.trim().length === 0) {
                    throw new Error('El nombre no puede contener solo espacios');
                }
                if (value.includes('  ')) {
                    throw new Error('El nombre no puede contener espacios dobles');
                }
            }
        }
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El apellido no puede estar vacío'
            },
            len: {
                args: [2, 50],
                msg: 'El apellido debe tener entre 2 y 50 caracteres'
            },
            is: {
                args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                msg: 'El apellido solo puede contener letras y espacios'
            },
            notOnlySpaces(value) {
                if (value.trim().length === 0) {
                    throw new Error('El apellido no puede contener solo espacios');
                }
                if (value.includes('  ')) {
                    throw new Error('El apellido no puede contener espacios dobles');
                }
            }
        }
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        validate: {
            isBoolean: {
                msg: 'El estado debe ser verdadero o falso'
            }
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isBoolean: {
                msg: 'El campo isAdmin debe ser verdadero o falso'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Este email ya está registrado'
        },
        validate: {
            notEmpty: {
                msg: 'El email no puede estar vacío'
            },
            isEmail: {
                msg: 'Debe proporcionar un email válido'
            },
            len: {
                args: [5, 100],
                msg: 'El email debe tener entre 5 y 100 caracteres'
            },
            notOnlySpaces(value) {
                if (value.trim().length === 0) {
                    throw new Error('El email no puede contener solo espacios');
                }
            }
        }
    },

    aceptoTerminos: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isBoolean: {
                msg: 'El campo aceptoTerminos debe ser verdadero o falso'
            }
        }
    },
    fechaAceptacionTerminos: {
        type: DataTypes.DATE,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La contraseña es requerida'
            },
            len: {
                args: [8, 100],
                msg: 'La contraseña debe tener al menos 8 caracteres'
            },
            hasUppercase(value) {
                if (!/[A-Z]/.test(value)) {
                    throw new Error('Debe contener al menos una letra mayúscula');
                }
            },
            hasLowercase(value) {
                if (!/[a-z]/.test(value)) {
                    throw new Error('Debe contener al menos una letra minúscula');
                }
            },
            hasNumbers(value) {
                if (!/[0-9]/.test(value)) {
                    throw new Error('Debe contener al menos un número');
                }
            },
            hasSpecialChar(value) {
                if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    throw new Error('Debe contener al menos un carácter especial');
                }
            },
            notOnlySpaces(value) {
                if (value.includes(' ')) {
                    throw new Error('La contraseña no puede contener espacios');
                }
            }
        }
    }
}, {
    timestamps: true,
    paranoid: true,
    hooks: {
        beforeValidate: (user) => {
            if (user.nombre) {
                user.nombre = user.nombre.trim()
                    .replace(/\s+/g, ' ')
                    .toUpperCase();
            }
            if (user.apellido) {
                user.apellido = user.apellido.trim()
                    .replace(/\s+/g, ' ')
                    .toUpperCase();
            }
            if (user.documento) {
                user.documento = user.documento.trim()
                    .toUpperCase();
            }
            if (user.email) {
                user.email = user.email.trim().toLowerCase();
            }
            if (user.password) {
                user.password = user.password.trim();
            }
        }
    }
});


User.paginate = async (records, page) => {
    const users = await User.findAll({
        limit: records,
        offset: records * (page - 1)
    });

    const lastPage = Math.ceil((await User.count()) / records);

    return {
        data: users,
        meta: {
            current: page,
            records: records,
            next: (lastPage >= page + 1) ? page + 1 : null,
            last: lastPage
        }
    };
}

export { User };
