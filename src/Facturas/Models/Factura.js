import { DataTypes } from "sequelize";
import { sequelize } from "../../database.js";
import { Articulo } from "./Articulo.js";

const Factura = sequelize.define("factura", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  fichaClinicaId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  paranoid: true,
});



export { Factura };
