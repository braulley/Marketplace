const Ad = require('../models/Ad')
const User = require('../models/User')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')
const Purchase = require('../models/Purchase')

class PurchaseController {

    async store(req, res){

        try{
            const { ad, content } =  req.body         
            
            const purchaseAd = await Ad.findById(ad).populate('author').where('purchasedByld').equals(null)
            
            const user = await User.findById(req.userId)
            
            if(purchaseAd){

                const createPurchase = await Purchase.create(req.body);

                Queue.create(PurchaseMail.key, {
                    ad: purchaseAd,
                    user,
                    content
                }).save()
                
                
                return res.json(createPurchase);
            }                     
            
            return res.json({'message': 'Purchase not found! '});
        }catch(error){
            return res.status(400).send(error)
        }        
    }

    async show(req, res){

        try{

            const purchaseId = req.params.id;
            console.log('purchaseId',purchaseId)
            const allPurchases = await Purchase.findById(purchaseId);

            return res.json(allPurchases);

        }catch(error){
            return res.status(400).json(error)
        }
        
    }

    async salesmanPurchase(req, res) {

        try{
            const purchaseId  =  req.body.purchaseId;

            var purchase = await Purchase.findById(purchaseId);
            
            console.log('PURCHASE',purchase.id)
            const ad = await Ad.find({ purchasedById : purchase.id }) 
            console.log('ADTESTE', ad.length)
            if(ad > 0){
                return res.json({'message':'Cannot possible to use AD'})
            }
            const adUpdate = await Ad.findByIdAndUpdate(purchase.ad, { purchasedById: purchase.id}, {
                new: true
            })

            console.log('adUpdate',adUpdate)
            return res.json(adUpdate)
        
            
        }catch(error){
            return res.status(400).json(error);
        }                    
    } 
}

module.exports = new PurchaseController()