const express =  require('express')
const validate = require('express-validation')
const routes = express.Router()
const controllers = require('./app/controllers')
const authMiddleware = require('./app/middleware/auth')
const validators = require('./app/validators')

routes.get('/', (req, res) => {
    res.send('Hello')
})

routes.post('/users',validate(validators.User),  controllers.AdController.store)
routes.post('/sessions', validate(validators.Session), controllers.SessionController.store)

routes.use(authMiddleware)
/**
 * Ads
*/
routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validate(validators.Ad), controllers.AdController.store)
routes.put('/ads/:id',validate(validators.Ad), controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)
/*
* Purchases
*/

routes.get('/purchases/:id', controllers.PurchaseController.show)
routes.post('/purchases', validate(validators.Purchase), controllers.PurchaseController.store)
routes.post('/sallesman', controllers.PurchaseController.salesmanPurchase)

module.exports = routes