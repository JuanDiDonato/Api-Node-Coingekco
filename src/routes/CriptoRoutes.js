const {Router} = require('express')
const criptoRoutes = Router()
const {coins, addCoins, mycoins} = require('../Controllers/CriptoControllers')
const passport = require('passport')
require('../passport')


//Obtener Criptomonedas
criptoRoutes.get('/coins', passport.authenticate('jwt',{session:false}), coins)

//Agregar Criptomonedas
criptoRoutes.post('/mycoins',passport.authenticate('jwt',{session:false}), addCoins)

//Obtener criptomonedas del usuario
criptoRoutes.get('/mycoins', passport.authenticate('jwt',{session:false}), mycoins)


module.exports=criptoRoutes