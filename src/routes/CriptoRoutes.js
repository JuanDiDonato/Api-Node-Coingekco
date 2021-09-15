const {Router} = require('express')
const criptoRoutes = Router()
const {coins, addCoins} = require('../Controllers/CriptoControllers')
const passport = require('passport')
require('../passport')


//Obtener Criptomonedas
criptoRoutes.get('/coins', passport.authenticate('jwt',{session:false}), coins)

//Agregar Criptomonedas
criptoRoutes.post('/mycoins',passport.authenticate('jwt',{session:false}), addCoins)


module.exports=criptoRoutes