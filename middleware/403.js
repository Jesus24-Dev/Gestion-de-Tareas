const autenticarSesion = (req, res, next) => {

    const id = req.params.id_usuario
    const cookie = req.signedCookies.sesion

    if (cookie && id == cookie.id && req.session.usuarioId) {
        next()
    } else {
        return res.status(403).render('403', {
            title: '403 Forbidden'
        });
    }


}

module.exports = { autenticarSesion }