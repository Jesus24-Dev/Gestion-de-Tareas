const { Tarea } = require('../models/index.js')
const { Op } = require('sequelize')

const verTareas = (req, res) => {
    const {id_usuario, id_proyecto, nombre_proyecto} = req.params

    Tarea.findAll({
        where: {
            id_proyecto
        }, 
        order: [
            ['estado', 'ASC'],
            ['prioridad', 'ASC'],
        ]
    })
    .then((tareas) => {
        res.status(200).render('proyectos', {
            title: 'Tareas',
            page: 'tareas',
            tareas,
            id_usuario,
            id_proyecto,
            nombre_proyecto
        })
    })
    .catch(err => {
        res.status(500).send('Ocurrio un error al ver las tareas')
    })
}

const crearTarea = (req, res) => {
    const {id_usuario, id_proyecto, nombre_proyecto} = req.params

    if(req.method == 'GET'){
        res.status(200).render('proyectos', {
            title: 'Crear tarea',
            page: 'crearTarea',
            error: '',
            id_usuario,
            id_proyecto,
            nombre_proyecto
        })
    } else {
        const {nombre, prioridad} = req.body
        console.log(req.body)
        if (!nombre || !prioridad){
            return res.status(400).render('proyectos', {
                title: 'Crear tarea',
                page: 'crearTarea',
                error: 'campos vacios',
                id_usuario,
                id_proyecto,
                nombre_proyecto
            })
        }

        Tarea.create({
            nombre,
            prioridad,
            id_proyecto
        })
            .then(() => {
                res.redirect(`/tarea/${id_usuario}/${id_proyecto}/${nombre_proyecto}`)
            })
            .catch(err => {
                if(err.name == 'SequelizeForeignKeyConstraintError'){
                    return res.status(400).send('No existe proyecto.')
                }
                res.status(500).send(err.name)
            })
        }
}

const completarTarea = (req, res) => {
    const { id_usuario, id_proyecto, nombre_proyecto, id } = req.params

    Tarea.update({
        estado: true
    }, {
        where: {
            id,
            id_proyecto
        }
    })
    .then(() => {
        res.status(201).redirect(`/tarea/${id_usuario}/${id_proyecto}/${nombre_proyecto}`)
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
}

const eliminarTarea = (req, res) => {
    const { id_usuario, id_proyecto, nombre_proyecto, id } = req.params

    Tarea.destroy({
        where: {
            id,
            id_proyecto
        }
    })
    .then(() => {
        res.status(201).redirect(`/tarea/${id_usuario}/${id_proyecto}/${nombre_proyecto}`)
    })
    .catch(err => {
        res.status(500).send(err.message)
    })
}

module.exports = {
    verTareas,
    crearTarea,
    completarTarea,
    eliminarTarea
}