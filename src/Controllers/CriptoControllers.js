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

CriptoControllers.mycoins = async (req,res) => {
    const rev = req.body
    coinUser = []
    const dataUser = req.user[0];
    const coinsFav = await pool.query('SELECT * FROM profile WHERE user = ?', dataUser.id_user)
    if(coinsFav.length > 0){
        for(i in coinsFav){
            coinUser.push(coinsFav[i].cripto)
        }
    }else{
        res.json({'ERROR':'No tiene criptomonedas agregadas.'})
    }
    dataCoinUser = []
    for(i in coinUser){
        let coinValueUser = dataUser.coin
        data = {}
        const dataCoin =  await CoinGeckoClient.coins.fetch(coinUser[i] , {
            tickers: false,
            community_data: false,
            developer_data: false,
            localization: false,
            sparkline: false,
            market_data: true,

        });
        
        data.id = dataCoin.data.id,
        data.symbol = dataCoin.data.symbol,
        data.image = dataCoin.data.image.small,
        data.priceUSD = dataCoin.data.market_data.current_price.usd,
        data.priceEUR = dataCoin.data.market_data.current_price.eur,
        data.priceUSER = dataCoin.data.market_data.current_price[coinValueUser]
        data.last_updated = dataCoin.data.market_data.last_updated
        dataCoinUser.push(data)
    }
    if(rev == false){
        dataCoinUser.sort(((a, b) => b.priceUSER - a.priceUSER));
    }else{
        dataCoinUser.sort(((a, b) => a.priceUSER - b.priceUSER ));
    }
    res.json(dataCoinUser)
}
module.exports=CriptoControllers