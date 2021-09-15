const pool = require('../database/connection')
const {HashPassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const NewUserControllers = {}

//Token
NewUserControllers.newToken = (id_user,coin) =>{
    return jwt.sign({
        iss: 'qu13r3s_l3ch3',
        sub: {id_user, coin}
    }, 'qu13r3s_l3ch3', {expiresIn: '1h'})
}

NewUserControllers.register = async (req,res) => {
    const {name, surname, username, password, coin} = req.body
    if(name == null || name == '' ||surname == null || surname == '' ||
    username == null || username == '' ||
    password == null || password == '' || 
    coin == null || coin == ''){
           res.json({'ERROR':'Por favor, complete todos los campos.'})
    }else{
        const dbUser = await pool.query('SELECT * FROM user WHERE username = ?', username)
        if(dbUser.length >= 1 ){
            res.json({'ERROR': 'El nombre '+username+' ya esta en uso.'})
        }else{
            newUser = {name, surname, username, password, coin}
            newUser.password = await HashPassword(password)
            await pool.query('INSERT INTO user SET ?', newUser)
            res.json({'EXITO': 'Cuenta creada con exito.'})
        }
    }
}

NewUserControllers.login = async(req, res) => {
    if(req.isAuthenticated()){
        const {username, id_user,coin} = req.user
        token = NewUserControllers.newToken(id_user,coin)
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.json({'EXITO' : 'Login as: '+username})
    }
}

module.exports=NewUserControllers