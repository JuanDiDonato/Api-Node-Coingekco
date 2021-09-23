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

    let coins = cryptoHis.map(crypt => crypt);
    let dataLength = cryptoHis.map(crypt => moment(crypt[0]).fromNow());
    let volume = cryptoVol.map(vol => vol);
    let volLength = cryptoVol.map(vol => moment(vol[0]).fromNow());
    let links = crypto.links;

    if(crypto.length === 0){
        return(<h1>Cargando datos...</h1>)
    }else{    

        const ContarDias = (dias) => {
            setDias(dias)
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
            <div className="container mt-5 detalles">
                <div className="border-left col-md-12">
                    <div className="mt-3 img-fluid ">
                        <img src={crypto.image.small} alt=''></img>
                        <h1>{crypto.name}</h1>
                    </div> 
                    <div className="mt-3">
                        <h2>Datos generales</h2>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">{'Simbolo: '+ crypto.symbol}</li>
                            <li className="list-group-item">{'Ranking Coingecko: '+ crypto.coingecko_rank}</li>
                            <li className="list-group-item">{'Ranking de Mercado : '+ crypto.market_cap_rank}</li>
                            {crypto.genesis_date? <li className="list-group-item">{'Creacion: '+ crypto.genesis_date}</li > : null}
                            <li className="list-group-item">{'Precio Usd: $'+ crypto.market_data.current_price.usd}</li>
                        </ul>
                    </div> 
                    <div className="mt-3">
                        <h3>Variaciones de precio</h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Cambio en 1 horas: {crypto.market_data.price_change_percentage_1h_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_1h_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_1h_in_currency.usd}</p>}</li>
                            <li className="list-group-item">Cambio en 24 horas: {crypto.market_data.price_change_percentage_24h_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_24h_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_24h_in_currency.usd}</p>}</li>
                            <li className="list-group-item">Cambio en 7 dias: {crypto.market_data.price_change_percentage_7d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_7d_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_7d_in_currency.usd}</p>}</li>
                            <li className="list-group-item">Cambio en 30 dias: {crypto.market_data.price_change_percentage_30d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_30d_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_30d_in_currency.usd}</p>}</li>
                            <li className="list-group-item">Cambio en 200 dias: {crypto.market_data.price_change_percentage_200d_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_200d_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_200d_in_currency.usd}</p>}</li>
                            <li className="list-group-item">Cambio en 1 año: {crypto.market_data.price_change_percentage_1y_in_currency.usd >= 0 ?<p style={{color:'green',display: 'inline'}}>{crypto.market_data.price_change_percentage_1y_in_currency.usd}</p>:<p style={{color:'red', display: 'inline'}}>{crypto.market_data.price_change_percentage_1y_in_currency.usd}</p>}</li>
                        </ul>
                    </div>
                    <div className="mt-3">
                        <h3><i className="fa fa-link m-1"></i>Enlaces</h3>
                         <ul className="list-group list-group-flush">
                            {links.blockchain_site.map(link=> {
                                let NewString = link.substring(25, link)
                                return(
                                    <div  key={link}>
                                        {link.length > 0 ? <li className="list-group-item m-1"><a href={link}>{NewString+'...'}</a></li> : null}
                                    </div>
                    
                                    
                                )   
                            })}
                        </ul> 
                    </div>
                </div>

                <div className="border-left col-md-12">

                    <div className="form-group col-md-12 mt-5">
                        <h3>Dias</h3>
                        <input type="number" placeholder="dias" className="form-control" id="dias" onChange={e => ContarDias(e.target.value) }/>
                    </div>
                    <div className="mx-auto mt-5 p-2 col-md-12">
                        <div className="img-fluid">{LineChart()}</div>
                        <div className="img-fluid">{LineChartVol()}</div>
                    </div>
                    {crypto.description.en ? 
                    <div className="mx-auto mt-5 p-2">
                        <h3>Datos adicionales</h3>
                            <div >
                                {/*Boton Descripcion*/}
                                <button type="button" className="btn btn-dark btn-block" data-toggle="modal" data-target="#desc">
                                 Ver descripcion
                                </button>

                                {/*Descripcion*/}
                                <div className="modal fade" id="desc" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-xl ">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">{crypto.name}</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <h6 className="container">{crypto.description.en}</h6>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                                
                               
                                
                            </div>
                    </div> : null } 
                </div>
            </div>
        )
    }
}
