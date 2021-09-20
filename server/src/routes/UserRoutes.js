const {Router} = require('express')
const userRoutes = Router()
const {login, register, dataUser} = require('../Controllers/UserControllers')
const passport = require('passport')
require('../passport')


//register
userRoutes.post('/register', register)

//login
userRoutes.post('/login',passport.authenticate('local',{session:false}), login)

//data
userRoutes.get('/data', passport.authenticate('jwt',{session:false}), dataUser)


module.exports=userRoutes