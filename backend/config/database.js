import { Sequelize } from "sequelize";
 
const db = new Sequelize('employee_lookup', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});
 
export default db;