import React, {useEffect, useState} from 'react'
import coingecko from '../assets/img/coingecko.png'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'

export default function Coins() {
    const [log, setLog]= useState(false)
    const [message, setMessage] = useState()
    const [data, setData] = useState([])
    const [pag, setPage] = useState(1)
    const [results, setResults] = useState([])

    useEffect(() => {
        const GetCoins = async () => {
            let page = pag
            const {data} = await axios.post('/coins',{page},{validateStatus:false})
            setData(data.messages.coins)
            setResults(data.messages.coins)
        }
        GetCoins()
    //eslint-disable-next-line
    }, [pag])
    const alerta = () =>{
        setTimeout(() => {
            setLog(false)
        }, 2000);
        return(
            <div className="alert alert-dark col-md-4 mx-auto  m-3">
                <h6>{message}</h6>
            </div>
        )
    }
    const nextpage = async () => {
        setPage(pag+1)
    }
    const backpage = async () => {
        if(pag <= 1){
        }else{
            setPage(pag-1)
        }
    }
    const favoritos = async (coinFav) => {
        const {data} = await axios.post('/mycoins', {coinFav}, {validateStatus:false});
        if(data.messages.error === true){
            setLog(true)
            setMessage(data.messages.message)
        }else{
            setLog(true)
            setMessage(data.messages.message)
        }
    }
    const onChange = e => {
        buscador(data,e.target.value)
    }
    const buscador = (data,search) => {
        const FilterCoin = data.filter((coin)=>coin.id.toLowerCase().includes(search.toLowerCase()))
        console.log(search);
        if(search.length > 0){
            setResults(FilterCoin)
        }else{
            setResults(data)
        }
    }

    if(data.length === 0){
        return(
            <main>
                <header className="fondo-NOcoins">
                    <div >
                        <div  className="durlock">
                            <h1>Criptomonedas disponibles</h1>
                            <img src={coingecko} alt="coingecko" />
                            <h5>Coortesia de CoinGekco</h5>            
                        </div>
                        <div>
                            <div >
                            <button  className="button-page" type="submit" id="next" onClick={backpage}><i className="fa fa-chevron-left "></i></button>
                                <button disabled="disabled" className="button-cont" >-</button>
                                <button className="button-page" type="submit" id="next" onClick={nextpage}><i className="fa fa-chevron-right"></i></button>
                            </div>
                            <div>
                                <h3>Obteniendo monedas...</h3>
                                <i className=" fa fa-circle-o-notch fa-spin fa-4x"></i>
                            </div>
                        </div>
                    </div>
                </header>
            </main>

        )
    }
    return (
        <main>
            <header>
                    <div >
                            <div className="durlock">
                                <h1>Criptomonedas disponibles</h1>
                                <img src={coingecko} alt="coingecko" className="p-1" />
                                <h5>Coortesia de CoinGekco</h5>
                            </div>
                            <div >
                                <input type="text" className="input-coins" placeholder="Busca una moneda!" id="buscador" onChange={onChange}/>                                                   
                            </div>
                        <div>
                            <div>
                                <button  className="button-page" type="submit" id="next" onClick={backpage}><i className="fa fa-chevron-left "></i></button>
                                <button disabled="disabled" className="button-cont" >{pag}</button>
                                <button className="button-page" type="submit" id="next" onClick={nextpage}><i className="fa fa-chevron-right"></i></button>
                            </div>
                            <div>{log ? alerta() : null}</div>
                            <div className="mt-3">
                                <table>
                                    <thead >
                                        <tr className="tabla-header">
                                            <th scope="col">Criptomoneda</th>
                                            <th scope="col"><i className="fa fa-money mr-1"></i>Precio</th>
                                            <th scope="col"><i className="fa fa-clock-o mr-1"></i>Ultima actualizacion</th>
                                            <th scope="col">Logo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                    
                                    {
                                        results.map(result => {
                                            return(
                                            <tr key={result.id} className="tabla-coins">
                                                <th scope="row" id={result.id} style={{cursor:'pointer'}} onClick={() => favoritos(result.id)}><i className="fa fa-plus mr-1"></i>{result.id}</th>
                                                <th scope="row">{'$'+result.current_price}</th>
                                                <th scope="row" >{moment(result.last_updated).fromNow()}</th>
                                                <th scope="row"><div className="img-fluid"><img src={result.image} alt={result.id} style={{width:'50px'}}/></div></th>  
                                            </tr>
                                            )})
                                    }

                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                    
                </div>
            </header>
        </main>
        
    )
}
