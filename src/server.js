const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const validate = require('express-validation')
//YOUCH formatação de erros
const Youch = require('youch')

const routes = require('./routes')

class App {

    constructor(){
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'
        
        this.middleware()
        this.database()
        this.routes()
        this.exception()
    }

    database(){
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    middleware(){
        this.express.use(express.json())        
    }

    routes(){
        this.express.use(routes)
    }

    exception(){

        this.express.use( async (err, req, res, next) => {

            if(err instanceof validate.ValidationError){
                return res.status(err.status).json(err)
            }
            
            if(process.env.NODE_ENV !== 'production'){
                const youch =  new Youch(err)

                return res.json(await youch.toJSON(err))
            }

            return res.status(err.status || 500).json({ error: 'internal server error' })
        })
    }
}

module.exports = new App().express