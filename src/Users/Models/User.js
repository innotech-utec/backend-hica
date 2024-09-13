import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    documento: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false  // Por defecto, los usuarios no son administradores
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {  // Restaurado a su nombre original
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,  // Asegura que createdAt y updatedAt existan
    paranoid: true    // Habilita soft delete
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
