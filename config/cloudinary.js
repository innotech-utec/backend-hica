// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import { Reseña } from '../src/Animales/Models/Reseña.js';


cloudinary.config({ 
    cloud_name: 'dqpzrc50c', 
    api_key: '236748752761697', 
    api_secret: 'TvjmySG-jyIsTTnVuxQPthpNw_A'
});

const uploadToCloudinary = async (base64String) => {
    try {
        const result = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${base64String}`,
            {
                folder: 'veterinarios', // Carpeta específica para fotos de veterinarios
                resource_type: 'image'
            }
        );
        return result.secure_url;
    } catch (error) {
        console.error('Error al subir a Cloudinary:', error);
        throw error;
    }
};

export { uploadToCloudinary };

export const uploadResenaController = async (request, response) => {
  console.log('1. Solicitud recibida en el backend');
  
  try {
      const { imagen, fichaClinicaId } = request.body;
      
      console.log('2. Datos recibidos:', {
          hayImagen: !!imagen,
          longitudImagen: imagen ? imagen.length : 0,
          fichaClinicaId
      });
      
      // Validar imagen
      if (!imagen) {
          console.log('3. Error: No se recibió imagen');
          return response.status(400).json({ message: 'No se recibió ninguna imagen' });
      }

      // Validar fichaClinicaId
      if (!fichaClinicaId) {
          console.log('3.1 Error: No se recibió fichaClinicaId');
          return response.status(400).json({ message: 'No se recibió el ID de la ficha clínica' });
      }

      // Buscar si ya existe una reseña para esta ficha
      const reseñaExistente = await Reseña.findOne({
          where: { fichaClinicaId }
      });

      // Subir imagen a Cloudinary
      console.log('4. Iniciando subida a Cloudinary');
      const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imagen}`,
          {
              folder: 'resenas',
              resource_type: 'image',
              format: 'png'
          }
      );
      console.log('5. Respuesta de Cloudinary:', {
          url: result.secure_url,
          public_id: result.public_id
      });

      let reseña;
      if (reseñaExistente) {
          // Si existe, actualizar
          console.log('6. Actualizando reseña existente');
          reseña = await reseñaExistente.update({
              imagen: result.secure_url
          });
          
          // Eliminar imagen anterior de Cloudinary si existe
          if (reseñaExistente.imagen) {
              try {
                  const publicId = reseñaExistente.imagen.split('/').pop().split('.')[0];
                  await cloudinary.uploader.destroy(publicId);
              } catch (error) {
                  console.log('Error al eliminar imagen anterior:', error);
              }
          }
      } else {
          // Si no existe, crear nueva
          console.log('6. Creando nueva reseña');
          reseña = await Reseña.create({
              fichaClinicaId,
              imagen: result.secure_url
          });
      }

      return response.status(201).json({
          message: reseñaExistente ? 'Reseña actualizada exitosamente' : 'Reseña creada exitosamente',
          url: result.secure_url,
          public_id: result.public_id,
          reseña
      });
      
  } catch (error) {
      console.error('Error en el controlador:', error);
      return response.status(500).json({
          message: 'Error al guardar la reseña',
          error: error.message
      });
  }
};