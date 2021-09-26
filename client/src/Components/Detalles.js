import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Line} from 'react-chartjs-2';
import moment from 'moment'
import 'moment/locale/es'


export default function Detalles(props) {
    const {match: {params}} = props
    const id = params.id
    const [crypto, setCrypto] = useState([])
    const [cryptoHis, setCryptoHis] = useState([])
    const [cryptoVol, setCryptoVol] = useState([])
    const [dias, setDias] = useState(1)
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const GetCoin = async () => {
            const {data:{data}} = await axios.post('/favcoin', {'coin':id}, { validateStatus: false })
            setCrypto(data)
           
        }
        const GetHis = async () => {
            const {data: {data}} = await axios.post('/favhistory', {'crypto':id, 'days': dias},  { validateStatus: false })
            setCryptoHis(data.prices)
            setCryptoVol(data.total_volumes)
        }
        GetCoin()
        GetHis()
        //eslint-disable-next-line
    }, [dias]);

    const PonerModal = () => {
        if(modal === false){
            setModal(true)
            const item = document.getElementById('body')
            item.classList.add('tbody')
        }else{
            setModal(false)
            const item = document.getElementById('body')
            item.classList.remove('tbody')
        }

    }
    const MostrarModal = (data) => {
        if(modal===true){

            return(
                <div className="tarjeta-modal animacionE"  >
                    <p>{data}</p>
                    <button type="button" className="button-login" onClick={PonerModal}>
                        Cerrar descripcion
                    </button>
                </div>
            )
        }
    }

    let coins = cryptoHis.map(crypt => crypt);
    let dataLength = cryptoHis.map(crypt => moment(crypt[0]).fromNow());
    let volume = cryptoVol.map(vol => vol);
    let volLength = cryptoVol.map(vol => moment(vol[0]).fromNow());
    let links = crypto.links;

    if(crypto.length === 0){
        return(<h1>Cargando datos...</h1>)
    }else{    

        const ContarDias = (dias) => {
            if(dias === '' || dias === null){
                setDias(1)
            }
            if(dias < 1){
                setDias(1)
            }
            else{
                setDias(dias)
            }
            
        }

        const data = {
            labels: dataLength,
            datasets: [
              {
                label: 'Precio',
                data: coins,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
              },
            ],
        };
        const LineChart = () => (
            <>
              <div className='header'>
                <h3 className='title'>Precio en {dias} dias</h3>
              </div>
              <Line data={data}  />
            </>
        );
        const dataVol = {
            labels: volLength,
            datasets: [
              {
                label: 'Volumen',
                data: volume,
                fill: false,
                backgroundColor: 'rgb(14, 31, 237 )',
                borderColor: 'rgba(14, 31, 237 , 0.2)',
              },
            ],
        };
        const LineChartVol = () => (
            <>
              <div className='header'>
                <h3 className='title'>Volumen en {dias} dias</h3>
              </div>
              <Line data={dataVol}  />
            </>
        );
        

        return (
            <div className="grilla-detalles" id='body'>
                <div className="tarjeta-detalles">
                    <div>
                        <img src={crypto.image.small} alt=''></img>
                        <h1>{crypto.name}</h1>
                    </div> 
                    <div>
                        <h2>Datos generales</h2>
                            <div >{'Simbolo: '+ crypto.symbol}</div>
                            <div >{'Ranking Coingecko: '+ crypto.coingecko_rank}</div>
                            <div >{'Ranking de Mercado : '+ crypto.market_cap_rank}</div>
                            {crypto.genesis_date? <div>{'Creacion: '+ crypto.genesis_date}</div > : null}
                            <div >{'Precio Usd: $'+ crypto.market_data.current_price.usd}</div>
                    </div> 
                    <div className="mt-3">
                        <h3>Variaciones de precio</h3>
                            <div>Cambio en 1 horas: {crypto.market_data.price_change_percentage_1h_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_1h_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_1h_in_currency.usd}</p>}</div>
                            <div>Cambio en 24 horas: {crypto.market_data.price_change_percentage_24h_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_24h_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_24h_in_currency.usd}</p>}</div>
                            <div>Cambio en 7 dias: {crypto.market_data.price_change_percentage_7d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_7d_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_7d_in_currency.usd}</p>}</div>
                            <div>Cambio en 30 dias: {crypto.market_data.price_change_percentage_30d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_30d_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_30d_in_currency.usd}</p>}</div>
                            <div>Cambio en 200 dias: {crypto.market_data.price_change_percentage_200d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_200d_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_200d_in_currency.usd}</p>}</div>
                            <div >Cambio en 1 año: {crypto.market_data.price_change_percentage_1y_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_1y_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_1y_in_currency.usd}</p>}</div>
                        
                    </div>
                    <div>
                        <h3><i className="fa fa-link "></i>Enlaces</h3>
                            {links.blockchain_site.map(link=> {
                                let NewString = link.substring(25, link)
                                return(
                                    <div  key={link}>
                                        {link.length > 0 ? <div><a href={link}>{NewString+'...'}</a></div> : null}
                                    </div>
                                )   
                            })}
                       
                    </div>
                    <div>
                    {crypto.description.en ? 
                    <div>
                        <h3>Datos adicionales</h3>
                            
                            <div >
                                <button type="button" className="button-login" onClick={PonerModal}>
                                 {modal ? 'Cerrar descripcion' : 'Ver Descripcion'}
                                </button>
                                
                                    {MostrarModal(crypto.description.en)}
                                
                            </div>
                    </div> : null } 
                    </div>
                </div>

                <div className="tarjeta-detalles">

                    <div>
                        <h3>Dias</h3>
                        <input type="number" placeholder='Nº de dias' className="input-detalles" id="dias" onChange={e => ContarDias(e.target.value) }/>
                    </div>
                    <div>
                        <div>{LineChart()}</div>
                        <div>{LineChartVol()}</div>
                    </div>
 
                </div>
            </div>
        )
    }
}
