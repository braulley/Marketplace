const Mail = require('../services/Mail')

class PurchaseMail {

    get Key(){
        return 'PurchaseMail'
    }

    async handle(job, done){

        const { ad, user, content } = job.data

        await Mail.sendMail({
            from: '"Diego Fernandes" <diego@rocketseat.com.br>',
            to: ad.author[0].email,
            subject: `Solicitação de compra: ${ad.title}`,
            template: 'purchase',
            context: { userName: user.name, userEmail: user.email, content, title: purchaseAd.title, name: purchaseAd.author[0].name }
        })

        return done()
    }
}

module.exports = new PurchaseMail()