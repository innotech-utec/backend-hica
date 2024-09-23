import cron from 'node-cron';
import { Animal } from '../Animales/Models/Animal.js';

// Definir la tarea cron
const actualizarEdadAnimales = () => {
    cron.schedule('0 0 1 1 *', async () => {
        console.log('Ejecutando tarea para actualizar la edad de los animales...');

        try {
            const animales = await Animal.findAll();

            animales.forEach(async (animal) => {
                const diffYears = new Date().getFullYear() - new Date(animal.fechaRegistro).getFullYear();

                if (diffYears > animal.edad) {
                    await Animal.update({ edad: diffYears }, {
                        where: { id: animal.id }
                    });
                }
            });

            console.log('Edades actualizadas.');
        } catch (error) {
            console.error('Error al actualizar las edades:', error);
        }
    });
};

export default actualizarEdadAnimales;
