import express from 'express';
import mysql from 'mysql2';
import { TEXT, UUID } from 'sequelize';
import {User} from '../src/Users/Models/User.js';

const app = express();

const connection = mysql.createConnection({
    host: '172.168.30.30',
    user: 'innotech',
    password: 'innotech',
    database: 'hica'
})

connection.connect((err) => {
    if (err) {
      console.error('Error de conexión:', err.stack);
      return;
    }
    console.log('Conectado como id ' + connection.threadId);
  });