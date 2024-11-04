// cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';

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
      const { imagen } = request.body;
      console.log('2. Datos recibidos:', {
        hayImagen: !!imagen,
        longitudImagen: imagen ? imagen.length : 0
      });
      
      if (!imagen) {
        console.log('3. Error: No se recibió imagen');
        return response.status(400).json({ message: 'No se recibió ninguna imagen' });
      }
  
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
  
      return response.status(201).json({
        message: 'Reseña guardada exitosamente',
        url: result.secure_url,
        public_id: result.public_id
      });
  
    } catch (error) {
      console.error('Error en el controlador:', error);
      return response.status(500).json({ 
        message: 'Error al guardar la reseña',
        error: error.message 
      });
    }
  };