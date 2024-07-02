const { cargarLogin, iniciarSesion} = require('../controller/indexController.js')

const { Router } = require('express')
const router = Router()

router.get('/', cargarLogin)
router.post('/', iniciarSesion)

module.exports = router