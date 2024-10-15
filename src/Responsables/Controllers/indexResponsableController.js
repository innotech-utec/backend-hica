import { Responsable } from '../Models/Responsable.js'; // Asegúrate de que la ruta al modelo es correcta

export const indexResponsableController = async (req, res) => {
  try {
    // Obtener todos los responsables de la base de datos
    const responsables = await Responsable.findAll(); 
    console.log('Responsables obtenidos:', responsables); // Mostrar los datos en la consola para verificar

    // Enviar los responsables en la respuesta
    res.status(200).json(responsables);
  } catch (error) {
    console.error('Error al obtener la lista de responsables:', error);
    res.status(500).json({ message: 'Error al obtener la lista de responsables' });
  }
};