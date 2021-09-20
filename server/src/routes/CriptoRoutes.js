const {Router} = require('express')
const criptoRoutes = Router()
const {coins, addCoins, mycoins, mycoin ,deleteCoin} = require('../Controllers/CriptoControllers')
const passport = require('passport')
require('../passport')


//Obtener Criptomonedas
criptoRoutes.post('/coins', passport.authenticate('jwt',{session:false}), coins)

//Agregar Criptomonedas
criptoRoutes.post('/mycoins',passport.authenticate('jwt',{session:false}), addCoins)

//Obtener criptomonedas del usuario
criptoRoutes.get('/favcoins', passport.authenticate('jwt',{session:false}), mycoins)

//Obtener una criptomoneda del usuario
criptoRoutes.post('/favcoin', passport.authenticate('jwt',{session:false}), mycoin)

//Borrar una criptomoneda del usuario
criptoRoutes.post('/delete', passport.authenticate('jwt',{session:false}), deleteCoin)


module.exports=criptoRoutes