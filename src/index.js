const app = require('./app.js')
const dotenv = require('dotenv')
const { sequelize } = require('../models');

dotenv.config()
const PORT = process.env.PORT

function main(){
    try {
        sequelize.sync({force: false})
            app.listen(PORT, () => {
                console.log(`Servidor lanzado en puerto ${PORT}`)
            })
    } catch (error) {
        console.log(error)
    }
}

main()



