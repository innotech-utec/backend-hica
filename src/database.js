import { Sequelize } from "sequelize"



//Establecer conexion con BD
const sequelize = new Sequelize(
    'hica',
    'innotech',
    'innotech',
    {
        host: '172.168.30.30',
        dialect: 'mysql'
    })

export { sequelize };