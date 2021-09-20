//Conexion a la base de datps
const pool = require('../database/connection');
//Coingecko Api
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


//Controladores a exportar
const CriptoControllers = {}


CriptoControllers.coins = async (req, res) =>{
    const {page} = req.body
    const dataUser = req.user;
    const coins = await CoinGeckoClient.coins.markets({vs_currency : dataUser.coin, page, per_page : 250});
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
    res.json({'messages': {'coins': cripto_list, 'error': false}})
}

CriptoControllers.addCoins = async (req,res) => {
    const {coinFav} = req.body
    console.log(req.body);
    const dataUser = req.user[0]
    if(coinFav == null || coinFav == ''){
        res.json({'messages': {'message': 'Moneda no valida', 'error': true}})
    }else{
        const cripto = await pool.query('SELECT * FROM criptos WHERE id_cripto = ?', coinFav)
        if(cripto.length == 0){
            await pool.query('INSERT INTO criptos SET ?', {'id_cripto' : coinFav})
            await pool.query('INSERT INTO profile SET ?', {'cripto':coinFav, 'user': dataUser.id_user})
            res.json({'messages': {'message': 'Moneda agregada correctamente', 'error': false}})
            
        }else{
            const criptoInProfile = await pool.query('SELECT * FROM profile WHERE user = ? AND cripto = ?', [dataUser.id_user, coinFav])
            if(criptoInProfile.length != 0){
                res.json({'messages': {'message': 'Esta moneda ya esta en favoritos', 'error': true}})
            }else{
                await pool.query('INSERT INTO profile SET ?', {'cripto':coinFav,'user' : dataUser.id_user})
                res.json({'messages': {'message': 'Moneda agregada correctamente', 'error': false}})
            }
        }
    }
}

CriptoControllers.mycoins = async (req,res) => {
    coinUser = []
    const dataUser = req.user[0];
    const coinsFav = await pool.query('SELECT * FROM profile WHERE user = ?', dataUser.id_user)
    if(coinsFav.length > 0){
        for(i in coinsFav){
            coinUser.push(coinsFav[i].cripto)
        }
    }else{
        res.json({'messages': {'message': 'No tiene monedas agregadas', 'error': true}})
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
        data.priceCHANGE = dataCoin.data.market_data.price_change_24h_in_currency[coinValueUser]
        data.last_updated = dataCoin.data.market_data.last_updated
        dataCoinUser.push(data)
    }
    // if(rev == false){
    //     dataCoinUser.sort(((a, b) => b.priceUSER - a.priceUSER));
    // }else{
    //     dataCoinUser.sort(((a, b) => a.priceUSER - b.priceUSER ));
    // }
    res.json({'messages': {'coins': dataCoinUser, 'error': false}})
}

CriptoControllers.mycoin = async (req,res) => {
    const {coin} = req.body
    const dataCoin =  await CoinGeckoClient.coins.fetch(coin, {
        tickers: false,
        community_data: false,
        developer_data: false,
        localization: false,
        sparkline: false,
        market_data: true,
        });

    res.json(dataCoin)
}



CriptoControllers.deleteCoin = async (req,res) => {
    const {coin} = req.body
    const dataUser = req.user[0];
    const coinsFav = await pool.query('SELECT * FROM profile WHERE user = ?', dataUser.id_user)
    if(coinsFav.length > 0){
        await pool.query('DELETE FROM profile WHERE user = ? AND cripto = ?', [dataUser.id_user, coin])
        res.json({'messages': {'message': 'Moneda removida exitosamente', 'error': false}})
    }else{
        res.json({'messages': {'message': 'No posee monedas agregadas a favoritos', 'error': true}})
    }

}
module.exports=CriptoControllers