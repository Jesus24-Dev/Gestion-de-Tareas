const {
    crearUsuario, 
    cambiarClave, 
    mostrarPregunta, 
    recuperarClave,
    cerrarSesion,
    eliminarUsuario,
    mostrarRegistro,
    ingresarNickname
} = require('../controller/usuarioController.js')
const { Router } = require('express')
const router = Router()

router.get('/', mostrarRegistro)
router.post('/', crearUsuario)
router.get('/recuperar_clave', ingresarNickname)
router.post('/recuperar_clave', ingresarNickname)
router.get('/recuperar_clave/:id', mostrarPregunta)
router.post('/recuperar_clave/:id', mostrarPregunta)
router.get('/actualizar_clave/:id', recuperarClave)
router.post('/actualizar_clave/:id', recuperarClave)

router.get('/cerrar_sesion', cerrarSesion)



module.exports = router
