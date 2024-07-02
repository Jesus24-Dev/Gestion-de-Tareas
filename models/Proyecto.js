const { DataTypes } = require('sequelize')
const sequelize = require('../database/database.js')

const Proyecto = sequelize.define('proyecto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false,
})


module.exports = Proyecto