import { Sequelize } from "sequelize"



//Establecer conexion con BD
const sequelize = new Sequelize(
    'hica',
    'innotech',
    'Innotech.2024',
    {
        host: '10.1.2.4',
        dialect: 'mysql',
	port: 3306
    })

export { sequelize };
