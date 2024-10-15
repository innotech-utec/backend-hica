// Archivo: src/Animales/Controllers/indexAnimalController.js

import { Animal } from '../Models/Animal.js';
import { Responsable } from '../../Responsables/Models/Responsable.js';

export const indexAnimalController = async (req, res) => {
  try {
    // Verificar la relación entre Animal y Responsable
    console.log('Verificando relación entre Animal y Responsable...');
    const relacionResponsable = Animal.associations.responsable;
    if (!relacionResponsable) {
      console.error('Error: Relación no definida correctamente entre Animal y Responsable');
      return res.status(500).json({ message: 'Relación no definida correctamente entre Animal y Responsable' });
    }

    // Consultar los animales con su responsable usando el alias correcto
    const animales = await Animal.findAll({
      include: {
        model: Responsable,
        as: 'responsable', // Asegúrate de que coincide con el alias definido en `relationships.js`
        attributes: ['nombre', 'apellido', 'documento'], // Selecciona los atributos del responsable
      },
      attributes: ['id', 'nombre', 'especie', 'raza', 'edad', 'sexo', 'peso', 'responsableId', 'createdAt'],
      order: [['createdAt', 'DESC']], // Ordenar por fecha de creación
    });

    res.status(200).json(animales);
  } catch (error) {
    console.error('Error al obtener el listado de animales:', error);
    res.status(500).json({ message: 'Error al obtener el listado de animales.' });
  }
};
