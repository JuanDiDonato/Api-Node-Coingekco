import React, {useEffect, useState} from 'react'
import coingecko from '../assets/img/coingecko.png'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'

export default function Coins() {

    const [data, setData] = useState([])
    const [pag, setPage] = useState(1)
    const [results, setResults] = useState([])
    const [search, setSearch] = useState('')

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
            alert(data.messages.message)
        }else{
            alert(data.messages.message)
        }
    }
    const buscador = (data,search) => {
        const FilterCoin = data.filter((coin)=>coin.id.toLowerCase().includes(search.toLowerCase()))
        if(FilterCoin.length > 0){
            setResults(FilterCoin)
        }
    }

    if(data.length === 0){
        return(
            <div className="mt-5 container col-md-10 mx-auto">
                <div className="mb-4">
                    <h1>Criptomonedas disponibles</h1>
                    <img src={coingecko} alt="coingecko" />
                    <h5>Coortesia de CoinGekco</h5>            
                </div>
                <div>
                    <div >
                        <button type="submit" id="next" className="btn btn-dark m-1" onClick={nextpage}>Siguiente</button>
                        <button type="submit" id="next" className="btn btn-primary m-1" onClick={backpage}>Anterior</button>
                        <button disabled="disabled" className="btn btn-outline-primary m-1">{pag}</button>
                    </div>
                    <div>
                        <h3>Obteniendo monedas...</h3>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="container col-md-10 mx-auto mt-5">
                    <div className="mb-4">
                        <h1>Criptomonedas disponibles</h1>
                        <img src={coingecko} alt="coingecko" className="p-1" />
                        <h5>Coortesia de CoinGekco</h5>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control mb-1" placeholder="Busca una moneda!" id="buscador" onChange={e => {setSearch(e.target.value); buscador(data,search)}}/>                                                   
                    </div>
                <div>
                    <div>
                        <button className="btn btn-info m-1" type="submit" id="next" onClick={nextpage}>Siguiente</button>
                        <button  className="btn btn-info m-1" type="submit" id="next" onClick={backpage}>Anterior</button>
                        <button disabled="disabled" className="btn btn-outline-info m-1" >{pag}</button>
                    </div>
                    <div className="mt-3 col-md-12 mx-auto">
                        <table className="table text-center">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Criptomoneda</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Ultima actualizacion</th>
                                    <th scope="col">Logo</th>
                                </tr>
                            </thead>
                            <tbody>
            
                            {
                                
                                results.map(result => {
                                    return(
                                    <tr key={result.id}>
                                        <th scope="row" id={result.id} style={{cursor:'pointer'}} onClick={() => favoritos(result.id)}>{result.id}</th>
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
    )
}
