const {Router} = require('express')
const userRoutes = Router()
const {login, register, dataUser, isAuthenticated, logout} = require('../Controllers/UserControllers')
const passport = require('passport')
require('../passport')


//register
userRoutes.post('/register', register)

//login
userRoutes.post('/login',passport.authenticate('local',{session:false}), login)

//logout
userRoutes.get('/logout' ,passport.authenticate('jwt',{session:false}), logout)

//data
userRoutes.get('/data', passport.authenticate('jwt',{session:false}), dataUser)

//authenticate
userRoutes.get('/authenticate' ,passport.authenticate('jwt',{session:false}), isAuthenticated)


module.exports=userRoutes