// edadAnimalController.js
import { Animal } from '../Models/Animal.js';

class EdadAnimalController {
    convertirEdad(edadValor, unidadOrigen, unidadDestino) {
        const factoresConversion = {
            DIAS: 1,
            SEMANAS: 7,
            MESES: 30.44,
            AÑOS: 365.25
        };

        const diasTotales = edadValor * factoresConversion[unidadOrigen];
        return Number((diasTotales / factoresConversion[unidadDestino]).toFixed(2));
    }

    validarDatosEdad(edadValor, edadUnidad) {
        const unidadesValidas = ['AÑOS', 'MESES', 'SEMANAS', 'DIAS'];
        
        if (!unidadesValidas.includes(edadUnidad)) {
            throw new Error('Unidad de edad no válida');
        }

        if (edadValor <= 0) {
            throw new Error('El valor de la edad debe ser mayor que 0');
        }

        const limites = {
            AÑOS: 100,
            MESES: 1200,
            SEMANAS: 5200,
            DIAS: 36500
        };

        if (edadValor > limites[edadUnidad]) {
            throw new Error(`La edad en ${edadUnidad.toLowerCase()} parece ser demasiado alta`);
        }

        return true;
    }

    obtenerEdadEn = async (req, res) => {
        try {
            const { animalId, unidad } = req.params;
            const unidadMayuscula = unidad.toUpperCase();

            const animal = await Animal.findByPk(animalId);
            if (!animal) {
                return res.status(404).json({ message: 'Animal no encontrado' });
            }

            const edadConvertida = this.convertirEdad(
                animal.edadValor,
                animal.edadUnidad,
                unidadMayuscula
            );

            return res.json({
                edadOriginal: `${animal.edadValor} ${animal.edadUnidad}`,
                edadConvertida: `${edadConvertida} ${unidadMayuscula}`
            });
        } catch (error) {
            return res.status(500).json({ 
                message: error.message || 'Error al convertir la edad' 
            });
        }
    }

    actualizarEdad = async (req, res) => {
        try {
            const { animalId } = req.params;
            const { edadValor, edadUnidad } = req.body;

            // Validar los datos de edad
            this.validarDatosEdad(edadValor, edadUnidad);

            const animal = await Animal.findByPk(animalId);
            if (!animal) {
                return res.status(404).json({ message: 'Animal no encontrado' });
            }

            await animal.update({
                edadValor,
                edadUnidad
            });

            return res.json({
                message: 'Edad actualizada correctamente',
                edad: {
                    valor: animal.edadValor,
                    unidad: animal.edadUnidad
                }
            });
        } catch (error) {
            return res.status(500).json({ 
                message: error.message || 'Error al actualizar la edad' 
            });
        }
    }
}

export default new EdadAnimalController();