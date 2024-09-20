// src/index.js
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import { router } from './routes.js';
import { sequelize } from './database.js';
import setupRelationships from './relationships.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createConfig = () => {
  const baseConfig = {
    development: {
      port: process.env.DEV_PORT || 4500,
      protocol: 'http',
      corsOptions: {
        origin: process.env.FRONTEND_URL || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      }
    },
    production: {
      port: 4500,
      protocol: 'https',
      corsOptions: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      },
      httpsOptions: {
        key: fs.readFileSync(path.join(__dirname, '..', 'backend-key.pem')),
        cert: fs.readFileSync(path.join(__dirname, '..', 'backend-cert.pem')),
      }
    }
  };

  const env = process.env.NODE_ENV || 'development';
  return baseConfig[env];
};

const config = createConfig();
const app = express();

async function startServer() {
  try {
    await setupRelationships();
    await sequelize.sync();
    console.log('Base de datos sincronizada y relaciones configuradas');

    app.use(cors(config.corsOptions));
    app.use(express.json());
    app.use('/api/v10', router);

    let server;
    if (config.protocol === 'https') {
      server = https.createServer(config.httpsOptions, app);
    } else {
      server = http.createServer(app);
    }

    server.listen(config.port, () => {
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Backend escuchando en el puerto ${config.port} con ${config.protocol.toUpperCase()}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

startServer();
