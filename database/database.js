const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()


const {database, user, pass, host, dialect} = JSON.parse(process.env.DATABASE)

const sequelize = new Sequelize(database, user, pass, {
    host,
    dialect
})

module.exports = sequelize