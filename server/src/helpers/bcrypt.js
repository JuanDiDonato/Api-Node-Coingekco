//Create Helpers
const bcrypt = require('bcrypt')
const helpers = {}

//Bcrypt
helpers.HashPassword = async (password) => {
    const salt = await bcrypt.genSalt(15)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

helpers.ComparePassword = async (password, savedPassword) => {
    try{
        return await bcrypt.compare(password, savedPassword)
    } catch (error) {
        console.log('[-] '+error);
    }
}

module.exports=helpers