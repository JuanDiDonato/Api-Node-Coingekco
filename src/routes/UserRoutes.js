const {Router} = require('express')
const userRoutes = Router()
const {login, register} = require('../Controllers/UserControllers')
const passport = require('passport')
require('../passport')


//register
userRoutes.post('/register', register)

//login
userRoutes.post('/login',passport.authenticate('local',{session:false}), login)


module.exports=userRoutes