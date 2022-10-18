import { Sequelize } from "sequelize";
import db from "../config/database.js";
 
const { DataTypes } = Sequelize;
 
const Employee = db.define('employees',{
    Name:{
        type: DataTypes.STRING
    },
    Surname:{
        type: DataTypes.STRING
    },
    Email:{
        type: DataTypes.STRING
    },
    Born:{
        type: DataTypes.STRING
    },
    Phone:{
        type: DataTypes.STRING
    }
},{
    freezeTableName: true
});
 
export default Employee;