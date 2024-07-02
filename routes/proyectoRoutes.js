const {
    verProyectos, 
    verProyecto, 
    crearProyecto,
    editarNombreProyecto,
    eliminarProyecto
} = require('../controller/proyectoController.js')
const { autenticarSesion } = require('../middleware/403.js')
const { Router } = require('express')
const router = Router()

router.get('/ver_proyecto/:id_usuario', autenticarSesion, verProyectos)
router.get('/ver_proyecto/:id_usuario/:id', autenticarSesion, verProyecto)
router.get('/crear_proyecto/:id_usuario', autenticarSesion, crearProyecto)
router.post('/crear_proyecto/:id_usuario', autenticarSesion, crearProyecto)
router.put('/editar_proyecto/:id_usuario/:id', autenticarSesion, editarNombreProyecto)
router.get('/eliminar_proyecto/:id_usuario/:id', autenticarSesion, eliminarProyecto)

module.exports = router