const { DataTypes } = require('sequelize')
const sequelize = require('../database/database.js')

const Usuario = sequelize.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pregunta_seguridad: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    respuesta_seguridad: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: false,
})

module.exports = Usuario