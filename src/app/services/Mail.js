const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const trasport = nodemailer.createTransport(mailConfig)
const viewPath = path.resolve(__dirname, '..', 'views', 'emails','partials')

trasport.use('compile', hbs({
    viewEngine: exphbs.create({
      partialsDir: viewPath,
      defaultLayout: null,
    }),
    viewPath,
    extName: '.hbs'
  }))
module.exports = trasport
