const mongoose = require('mongoose')

const PurchaseSchame = new mongoose.Schema({
    ad: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Purchase', PurchaseSchame)