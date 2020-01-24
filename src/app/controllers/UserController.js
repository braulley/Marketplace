const User = require('../models/User')

class UserController {

    async store(req, res){
        
        try{
            const { email } = req.body

            if(await User.findOne({ email : email })){
                return res.status(400).json({ error: 'User already exists' })
        }

            const user = await User.create(req.body)
            return res.json(user)
        }catch(error){
            return res.status(404).send(error)
        }
        
    }
}
module.exports = new UserController()