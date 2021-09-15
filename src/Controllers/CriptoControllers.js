//Conexion a la base de datps
const pool = require('../database/connection');
//Coingecko Api
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


//Controladores a exportar
const CriptoControllers = {}


CriptoControllers.coins = async (req, res) =>{
    const dataUser = req.user;
    const coins = await CoinGeckoClient.coins.markets({vs_currency : dataUser.coin});
    const data = coins.data
    cripto_list = []
    for(i in data){
        cripto = {}
        cripto.id = data[i].id
        cripto.symbol = data[i].symbol
        cripto.image = data[i].image
        cripto.current_price = data[i].current_price
        cripto.last_updated = data[i].last_updated
        cripto_list.push(cripto)
    }
    res.json(cripto_list)
}

CriptoControllers.addCoins = async (req,res) => {
    const {coinFav} = req.body
    const dataUser = req.user[0]
    if(coinFav == null || coinFav == ''){
        res.json({'ERROR':'This cripto not found'})
    }else{
        const cripto = await pool.query('SELECT * FROM criptos WHERE id_cripto = ?', coinFav)
        if(cripto.length == 0){
            await pool.query('INSERT INTO criptos SET ?', {'id_cripto' : coinFav})
            await pool.query('INSERT INTO profile SET ?', {'cripto':coinFav, 'user': dataUser.id_user})
            res.json({'EXITO':'Criptomoneda añadida correctamente.'})
            
        }else{
            const criptoInProfile = await pool.query('SELECT * FROM profile WHERE user = ? AND cripto = ?', [dataUser.id_user, coinFav])
            if(criptoInProfile.length != 0){
                res.json({'ERROR':'Esta criptomoneda ya esta en favoritos.'})
            }else{
                await pool.query('INSERT INTO profile SET ?', {'cripto':coinFav,'user' : dataUser.id_user})
                res.json({'EXITO':'Criptomoneda añadida correctamente.'})
            }
        }
    }
}
module.exports=CriptoControllers