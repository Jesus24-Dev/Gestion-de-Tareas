const { Proyecto } = require('../models/index.js')
const { Op } = require('sequelize')

const verProyectos = (req, res) => {
    const { id_usuario } = req.params
    
    Proyecto.findAll({
        where: {
            id_usuario
        }
    })
    .then(proyectos => {
        res.status(200).render('proyectos', {
            title: 'Proyectos',
            page: 'proyectos',
            proyectos,
            id_usuario,
        })
    })
    .catch(err => {
        res.status(500).json({mensaje: err.message})
    })
}

const verProyecto = (req, res) => {
    const {id, id_usuario} = req.params

    Proyecto.findOne({
        where: {
            [Op.and]: [{id}, {id_usuario}]
        }
    })
    .then(result => {
        if(!result){
            return res.status(404).send('Proyecto no encontrado')
        }
        res.status(200).json(result)
    })
    .catch(err => {
        if(err.name == 'SequelizeDatabaseError'){
            return res.status(404).send('Proyecto no existe')
        } 
        res.status(500).send('Ocurrio un error en el servidor')
    })
}

const crearProyecto = (req, res) => {
    const { id_usuario } = req.params

    if(req.method == 'POST'){
        const { nombre, descripcion } = req.body
        if(!nombre || !descripcion){
            return res.status(400).render('proyectos', {
                title: 'Proyectos',
                page: 'crearProyecto',
                error: 'campos vacios',
                id_usuario
            })
        }
        Proyecto.create({
            nombre,
            descripcion,
            id_usuario
        })
            .then(() => {
                res.status(201).redirect(`/proyecto/ver_proyecto/${id_usuario}`)
            })
            .catch(() => {
                res.status(500).send('Error al crear el proyecto')
            })
    } else {
        res.render('proyectos', {
            title: 'Proyectos',
            page: 'crearProyecto',
            error: '',
            id_usuario
        })
    }
}

const editarNombreProyecto = (req, res) => {
    const {id, id_usuario} = req.params
    const { nuevoNombre } = req.body

    if(!nuevoNombre){
        return res.status(400).send('Error, los campos son obligatorios')
    }

    Proyecto.update({
        nombre: nuevoNombre
    },{
        where: {
            [Op.and]: [{id}, {id_usuario}]
        }
    })
    .then(() => {
        res.status(201).send('Nombre del proyecto actualizado con exito!')
    })
    .catch(err => {
        res.status(500).send('Error al actualizar el archivo')
    })

}

const eliminarProyecto = (req, res) => {
    const {id, id_usuario} = req.params
    
    Proyecto.destroy({
        where: {
            [Op.and]: [{id}, {id_usuario}]
        }
    })
    .then(() => {
        res.redirect(`/proyecto/ver_proyecto/${id_usuario}`)
    })
    .catch((err) => {
        res.status(500).send('Hubo un error al eliminar el proyecto')
    })
}


module.exports = {
    verProyectos,
    verProyecto,
    crearProyecto,
    editarNombreProyecto,
    eliminarProyecto
}
