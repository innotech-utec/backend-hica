import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";
import { FichaClinica } from "./FichaClinica.js";

const Reseña = sequelize.define('reseñas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fichaClinicaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'fichasClinicas',
            key: 'id'
        }
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

export { Reseña };