
import { Responsable } from '../Models/Responsable.js';

// Función para obtener un responsable por su ID
export const getResponsableById = async (id) => {
  try {
    // Buscar el responsable por su UUID utilizando Sequelize
    const responsable = await Responsable.findOne({
      where: { id }, 
    });
    return responsable;
  } catch (error) {
    console.error('Error en getResponsableById:', error);
    throw error;
  }
};


