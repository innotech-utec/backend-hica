import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Define el directorio de subida
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Genera un nombre único para cada archivo
  }
});

// Configura multer para aceptar imágenes
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },  // Limitar el tamaño del archivo a 5 MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes JPEG o PNG'));
  }
});

export { upload };
