const sequelize = require('../database/database');
const Usuario = require('./Usuario');
const Proyecto = require('./Proyecto');
const Tarea = require('./Tarea');

Proyecto.hasMany(Tarea, {
    foreignKey: 'id_proyecto',
    sourceKey: 'id'
})

Tarea.belongsTo(Proyecto, {
    foreignKey: 'id_proyecto',
    targetKey: 'id'
})

Usuario.hasMany(Proyecto, {
    foreignKey: 'id_usuario',
    sourceKey: 'id'
})

Proyecto.belongsTo(Usuario, {
    foreignKey: 'id_usuario',
    targetKey: 'id'
})

const models = {
    Usuario,
    Proyecto,
    Tarea,
    sequelize
};

module.exports = models;