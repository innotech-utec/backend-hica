import https from 'https';
import fs from 'fs';
import express from 'express';
import { router } from './routes.js';
import { sequelize } from './database.js';
import setupRelationships from './relationships.js';
import cors from 'cors';

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'https://172.210.226.253',  // IP o dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v10', router);

// Certificados SSL para el backend
const httpsOptions = {
  key: fs.readFileSync('../backend-key.pem'),
  cert: fs.readFileSync('../backend-cert.pem'),
};

// Inicializar relaciones y sincronizar la base de datos
const startServer = async () => {
  try {
    await setupRelationships();
    await sequelize.sync();
    console.log('Base de datos sincronizada y relaciones configuradas');

    // Iniciar el servidor HTTPS en el puerto 4500
    https.createServer(httpsOptions, app).listen(4500, () => {
      console.log('Backend escuchando en el puerto 4500 con HTTPS');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();

