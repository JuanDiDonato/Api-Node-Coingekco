const pool = require('../database/connection')
const {HashPassword} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const NewUserControllers = {}

//Token
NewUserControllers.newToken = (id_user,coin) =>{
    return jwt.sign({
        iss: 'qu13r3s_l3ch3',
        sub: {id_user, coin}
    }, 'qu13r3s_l3ch3', {expiresIn: '10h'})
}

NewUserControllers.register = async (req,res) => {
    const {name, surname, username, password, coin} = req.body
    if(name == null || name == '' ||surname == null || surname == '' ||
    username == null || username == '' ||
    password == null || password == '' || 
    coin == null || coin == ''){
        res.json({'messages': {'message': 'Complete todos los campos', 'error': true}})
    }else{
        const dbUser = await pool.query('SELECT * FROM user WHERE username = ?', username)
        if(dbUser.length >= 1 ){
            res.json({'messages': {'message': 'El nombre '+username+' ya esta en uso', 'error': true}})
        }else{
            newUser = {name, surname, username, password, coin}
            newUser.password = await HashPassword(password)
            await pool.query('INSERT INTO user SET ?', newUser)
            res.json({'messages': {'message': 'Cuenta creada con exito', 'error': false}})
        }
    }
}

NewUserControllers.login = async(req, res) => {
    if(req.isAuthenticated()){
        const {username, id_user,coin} = req.user
        console.log(username);
        token = NewUserControllers.newToken(id_user,coin)
        res.cookie('access_token', token, {httpOnly : true, sameSite : true})
        res.json({'messages': {isAuthenticated:true, user:{username, coin} ,'message': 'Inicio sesion como '+username, 'error': false}})
    }else{
        res.json({'messages': {'message': 'Error al iniciar sesion', 'error': true}})
    }
}

NewUserControllers.logout = (req, res) => {
    res.clearCookie('access_token');
    res.json({user:{name:'', surname:'', username:'', password:'', coin:''}});

};

NewUserControllers.dataUser = (req,res)=> {
    const {username,coin} = req.user[0]
    const UserData = {username, coin}
    res.json(UserData)
}

NewUserControllers.isAuthenticated = (req,res) => {
    const {name, surname, username, password, coin} = req.user[0]
    console.log(req.user)
    res.json({isAuthenticated : true, user : {name, surname, username, password, coin}})
}

module.exports=NewUserControllers