const { Usuario } = require('../models/index.js')

const cargarLogin = (req, res) => {
    res.status(200).render('index', {
        title: 'Iniciar sesion',
        page: 'login',
        error: ''
    })
}

const iniciarSesion = (req, res) => {
    const { nickname, clave } = req.body

    if (!nickname || !clave){ 
        return res.status(400).render('index', {
            title: 'Iniciar sesion',
            page: 'login',
            error: 'campos vacios'
        })
    }
    Usuario.findOne({
        where: {
            nickname
        }
    }, {
        attributes: ["id", "nickname", "clave"]
    })
    .then(results => {
        if(results.clave != clave){
            return res.status(401).render('index', {
                title: 'Iniciar sesion',
                page: 'login',
                error: 'clave no coincide'
            })
        }
        req.session.usuarioId = results.id
        res.cookie('sesion', {id: results.id, usuario: results.nickname}, {signed: true})
        return res.redirect(`/proyecto/ver_proyecto/${results.id}`)
    })
    .catch(err => {
        if (err.name == 'TypeError'){
            return res.status(404).render('index', {
                title: 'Iniciar sesion',
                page: 'login',
                error: 'usuario inexistente'
            })
        } else {
            res.status(500).send('Error interno en el servidor, sorry not sorry')
        }
        
    })
}

module.exports = {
    cargarLogin,
    iniciarSesion
}