const { DataTypes } = require('sequelize')
const sequelize = require('../database/database.js')

const Tarea = sequelize.define('tarea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    prioridad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false,
})

module.exports = Tarea