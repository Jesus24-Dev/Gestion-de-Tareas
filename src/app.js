const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express()

const indexRoutes = require('../routes/indexRoutes.js')
const usuarioRoutes = require('../routes/usuarioRoutes.js')
const proyectoRoutes = require('../routes/proyectoRoutes.js')
const tareaRoutes = require('../routes/tareaRoutes.js')

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(path.dirname(__dirname), 'public')))
app.use(helmet.noSniff(), helmet.xssFilter());
app.use(session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser(process.env.MY_SECRET_KEY));

app.use('/', indexRoutes)
app.use('/usuario', usuarioRoutes)
app.use('/proyecto', proyectoRoutes)
app.use('/tarea', tareaRoutes)

app.set('view engine', 'ejs')
app.set('views', path.join(path.dirname(__dirname), ('views')))


if (process.env.NODE_ENV){
    app.use(morgan('dev'))
}


module.exports = app