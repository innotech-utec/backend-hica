import { DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Articulo = sequelize.define('articulo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  categoria:{
    type: DataTypes.ENUM('ANTIBIOTICO', 'ANALGESICO','ANTIFLAMATORIO', 'ANTIPIREPTICO', 'VITAMINA','SUPLEMENTO','VACUNA', 'CURACION','VENDAJE',
      'ANTISEPTICO', 'SUTURAS','JERINGAS', 'GUANTES','GASAS', 'CATETER', 'LIMPIEZA','DESINFECCION','ESTERILIZACION', 'ALIMENTACION','HIDRATACION','SUEROS', 'VARIOS'),
    defaultValue: 'VARIOS', 
    allowNull: false,
 },
  descripcion: {
    type: DataTypes.TEXT
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

  
export default Articulo;
