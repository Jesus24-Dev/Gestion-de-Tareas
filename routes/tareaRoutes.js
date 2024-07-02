const {
    verTareas, 
    crearTarea, 
    completarTarea, 
    eliminarTarea
} = require('../controller/tareaController.js')
const { autenticarSesion } = require('../middleware/403.js')
const { Router } = require('express')
const router = Router()

router.get('/:id_usuario/:id_proyecto/:nombre_proyecto', autenticarSesion, verTareas)
router.get('/crear_tarea/:id_usuario/:id_proyecto/:nombre_proyecto', autenticarSesion, crearTarea)
router.post('/crear_tarea/:id_usuario/:id_proyecto/:nombre_proyecto', autenticarSesion, crearTarea)
router.get('/completar/:id_usuario/:id_proyecto/:nombre_proyecto/:id', autenticarSesion, completarTarea)
router.get('/eliminar/:id_usuario/:id_proyecto/:nombre_proyecto/:id', autenticarSesion, eliminarTarea)

module.exports = router