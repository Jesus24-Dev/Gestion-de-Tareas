const { Usuario } = require('../models/index.js')

const mostrarRegistro = (req, res) => {
    res.status(200).render('index', {
        title: 'Registro de usuario',
        page: 'registro',
        error: ''
    })
}

const crearUsuario = (req, res) => {
    const { nickname, clave, pregunta_seguridad, respuesta_seguridad} = req.body

    if (!nickname || !clave || !pregunta_seguridad || !respuesta_seguridad){
        return res.status(400).render('index', {
            title: 'Registro de usuario',
            page: 'registro',
            error: 'campos vacios'
        })
    }
    Usuario.create({
        nickname,
        clave,
        pregunta_seguridad,
        respuesta_seguridad
    })
    .then((results) => {
        return res.redirect(`/proyecto/ver_proyecto/${results.id}`)
    })
    .catch(error => {
        if (error.name == "SequelizeUniqueConstraintError"){
            return res.status(400).render('index', {
                title: 'Registro de usuario',
                page: 'registro',
                error: 'usuario existente'
            })
        }
        res.status(500).json({error: error.name, mensaje: error.message})
    })
} 

const ingresarNickname = (req, res) => {
    if (req.method == 'POST'){
        const { nickname }= req.body

        Usuario.findOne({
            where: {
                nickname
            }, attributes: ["id"]
        })
        .then(results => {
            return res.redirect(`/usuario/recuperar_clave/${results.id}`)
        })
        .catch(err => {
            if (err.name == 'TypeError'){
                return res.status(404).render('index', {
                    title: 'Registro',
                    page: 'recuperarClave',
                    error: 'usuario inexistente'
                })
            } else {
                res.status(500).send('Error interno del servidor.')
            }
        })
    } else {
        return res.status(200).render('index', {
            title: 'Registro de usuario',
            page: 'recuperarClave',
            error: ''
        })
    }
}

const mostrarPregunta = (req, res) => {
    const {id} = req.params

    Usuario.findOne({
        where: {id}, 
        attributes: ["pregunta_seguridad", "respuesta_seguridad"]
    })
    .then(results => {
        if(req.method == 'POST'){
            metodoPost(results)
        } else {
            metodoGet(results)
        }
    })
    .catch(err => {
        return res.status(500).send({nombre: err.name, mensaje: err.message})
    })

    const metodoPost = (respuesta) => {
        const { respuesta_seguridad } = req.body 

        if(!respuesta_seguridad){
            return res.status(401).render('index', {
                title: 'Recuperar clave',
                page: 'comprobarSesion',
                error: 'campos vacios',
                pregunta: respuesta.pregunta_seguridad,
                id
            })
        }
        if (!respuesta){
            return res.status(404).send('Usuario no encontrado')
        }
        if(respuesta.respuesta_seguridad == respuesta_seguridad){
            return res.redirect(`/usuario/actualizar_clave/${id}`)
        } else {
            return res.status(401).render('index', {
                title: 'Recuperar clave',
                page: 'comprobarSesion',
                error: 'respuesta no coincide',
                pregunta: respuesta.pregunta_seguridad,
                id
            })
        } 
    }

    const metodoGet = (pregunta) => {
        if(!pregunta){
            return res.status(404).send('Usuario no encontrado')
        }
        return res.status(200).render('index',{
            title: 'Recuperar clave',
            page: 'comprobarSesion',
            error: '',
            pregunta: pregunta.pregunta_seguridad,
            id
        })
    }

   
}


const recuperarClave = (req, res) => {
    const { id } = req.params

    if(req.method == 'GET'){
        return res.status(200).render('index', {
            title: 'Recuperar clave',
            page: 'nuevaClave',
            error: '',
            id
        })
    } else {
        const { clave } = req.body 

        if (!clave){
            return res.status(400).render('index', {
                title: 'Recuperar clave',
                page: 'nuevaClave',
                error: 'campos vacios',
                id
            })
        }
        Usuario.update({
            clave
        }, {
            where: {
                id
            }
        })
            .then(() => {
                res.redirect('/')
            })
            .catch(error => {
                res.status(500).send('Ocurrio un error al actualizar la clave')
            })
        }
}


const cerrarSesion = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

module.exports = {
    mostrarRegistro,
    crearUsuario,
    ingresarNickname,
    mostrarPregunta,
    recuperarClave,
    cerrarSesion
}