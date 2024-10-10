import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";
import { User } from "./User.js";  

const Veterinario = sequelize.define('veterinarios', {
    N_de_registro: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    Validado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    deviceId: {
        type: DataTypes.STRING,
        allowNull: true,  // Permitir que inicialmente sea null si no ha autorizado ningún dispositivo
        unique: true      // Aseguramos que no se repita en otro veterinario
    },
    Dependencia: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Foto: {
        type: DataTypes.BLOB,
        allowNull: true
    },
    userId: {  // Relación 1:1 con la tabla User
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    timestamps: true,  // Asegura que createdAt y updatedAt existan
    paranoid: true    // Habilita soft delete
});


Veterinario.paginate = async (records, page) => {
    try {
      const veterinarios = await Veterinario.findAll({
        limit: records,
        offset: records * (page - 1),
        include: [{
          model: User,
          as: 'user',  // Asegúrate de que coincide con el alias en la definición de la relación
          attributes: ['id', 'nombre', 'apellido', 'email'],  // Solo trae los campos necesarios
        }],
      });
  
      const totalCount = await Veterinario.count();
      const lastPage = Math.ceil(totalCount / records);
  
      return {
        data: veterinarios.map(vet => vet.toJSON()),  // Convierte los objetos Sequelize a JSON
        meta: {
          current: page,
          records: records,
          next: (lastPage >= page + 1) ? page + 1 : null,
          last: lastPage,
        },
      };
    } catch (error) {
      console.error('Error al paginar veterinarios:', error);
      throw error;
    }
  };  


export { Veterinario };