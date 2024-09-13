import express from 'express';
import { router } from './routes.js';
import { sequelize } from './database.js';
import setupRelationships from './relationships.js';
import cors from 'cors';


const app = express();
await setupRelationships();
await sequelize.sync();
app.use(cors());
app.use(express.json());
app.use(router);



//puerto para recibir solictudes
app.listen(4500, async () => {
    console.log('App listening on port 4500');
});