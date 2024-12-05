import { Animal } from '../Models/Animal.js';
import { Responsable } from '../../Responsables/Models/Responsable.js';

export const indexAnimalController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    
    console.log('Verificando relación entre Animal y Responsable...');
    const relacionResponsable = Animal.associations.responsable;
    if (!relacionResponsable) {
      console.error('Error: Relación no definida correctamente entre Animal y Responsable');
      return res.status(500).json({ message: 'Relación no definida correctamente entre Animal y Responsable' });
    }
   
    const result = await Animal.paginate(6, page);
    
    // Incluir la relación con Responsable en los resultados paginados
    const animalesConResponsables = await Animal.findAll({
      where: {
        id: result.data.map(animal => animal.id)
      },
      include: {
        model: Responsable,
        as: 'responsable',
        attributes: ['nombre', 'apellido', 'documento'],
      },
      attributes: ['id', 'nombre', 'especie', 'raza', 'edadValor', 'edadUnidad', 'sexo', 'peso', 'responsableId', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });

    // Devolver el resultado con los datos completos
    res.status(200).json({
      data: animalesConResponsables,
      meta: result.meta
    });
    
  } catch (error) {
    console.error('Error al obtener el listado de animales:', error);
    res.status(500).json({ message: 'Error al obtener el listado de animales.' });
  }
};
