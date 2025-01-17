const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth =  require('../../config/auth')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 8)
})

UserSchema.methods = {
    compareHash(password) {
        return bcryptjs.compare(password, this.password )
    }
}

UserSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, auth.secret, {
            expiresIn: auth.ttl
        })
    }
}

module.exports = mongoose.model('User', UserSchema)