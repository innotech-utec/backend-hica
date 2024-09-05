import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: false });

//Paginado para optimizar consultas
User.paginate = async (records, page) => {

    const users = await User.findAll({
        limit: records,
        offset: records*(page-1)
    });

    const lastPage = Math.ceil((await User.count()) / records);

    return {
        data: users,
        meta: {
            current: page,
            records: records,
            next: (lastPage >= page+1) ? page+1 : null,
            last: lastPage
        }
    };
}

export { User };