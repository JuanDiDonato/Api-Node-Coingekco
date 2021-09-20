import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Detalles(props) {
    const {match: {params}} = props
    const id = params.id
    const [crypto, setCrypto] = useState([])

    useEffect(() => {
        const GetCoin = async () => {
            const {data:{data}} = await axios.post('/favcoin', {'coin':id}, { validateStatus: false })
            setCrypto(data)
            console.log(data);
        }
        GetCoin()
        //eslint-disable-next-line
    }, [])

    if(crypto.length === 0){
        return(<h1>Cargando datos...</h1>)
    }else{
        return (
            <div>
                <div>
                    <Link to='/mycoins'>Volver a favoritos</Link>
                </div>
                <div>
                    <img src={crypto.image.small} alt=''></img>
                    <h1>{crypto.name}</h1>
                </div> 
                <div>
                    <h2>Datos generales</h2>
                    <li>{'Simbolo: '+ crypto.symbol}</li>
                    <li>{'Ranking Coingecko: '+ crypto.coingecko_rank}</li>
                    <li>{'Ranking de Mercado : '+ crypto.market_cap_rank}</li>
                    {crypto.genesis_date? <li>{'Creacion: '+ crypto.genesis_date}</li> : null}
                    <li>{'Precio Usd: $'+ crypto.market_data.current_price.usd}</li>
                </div> 
                <div>
                    <h2>Variaciones de precio</h2>
                    <li>Cambio en 1 horas: {crypto.market_data.price_change_percentage_1h_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_1h_in_currency.usd}</p>:<li style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_1h_in_currency.usd}</li>}</li>
                    <li>Cambio en 24 horas: {crypto.market_data.price_change_percentage_24h_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_24h_in_currency.usd}</p>:<li style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_24h_in_currency.usd}</li>}</li>
                    <li>Cambio en 7 dias: {crypto.market_data.price_change_percentage_7d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_7d_in_currency.usd}</p>:<li style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_7d_in_currency.usd}</li>}</li>
                    <li>Cambio en 30 dias: {crypto.market_data.price_change_percentage_30d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_30d_in_currency.usd}</p>:<li style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_30d_in_currency.usd}</li>}</li>
                    <li>Cambio en 200 dias: {crypto.market_data.price_change_percentage_200d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_200d_in_currency.usd}</p>:<li style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_200d_in_currency.usd}</li>}</li>
                    <li>Cambio en 1 año: {crypto.market_data.price_change_percentage_1y_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_1y_in_currency.usd}</p>:<li style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_1y_in_currency.usd}</li>}</li>

                </div>
                <div>
                    <h2>Descripcion</h2>
                    <h4>{crypto.description.en}</h4>
                </div>
            </div>
    
        )
    }
}
