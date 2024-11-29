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
        allowNull: true,  
        unique: true      
    },
  
    Dependencia: {
      type: DataTypes.ENUM('Clinica Pequeños Animales', 'Equinos','Endocrinologia y Metabolismo Animal', 'Gestión Hospitalaria', 'Semiología'),
      defaultValue: 'Equinos', 
      allowNull: false,
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
    timestamps: true,  
    paranoid: true  
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