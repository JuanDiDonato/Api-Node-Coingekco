import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'

export default function Coins() {

    const [data, setData] = useState([])
    const [pag, setPage] = useState(1)
    const [results, setResults] = useState([])
    const [search, setSeacrh] = useState()

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
            <div>
            <div>
                <h1>Criptomonedas disponibles</h1>
                <h5>Coortesia de CoinGekco</h5>
                <h4><Link to='/mycoins'>Criptomonedas favoritas</Link></h4>            
            </div>
            <div>
                <input type="text" placeholder="Busca una moneda!" id="buscador" onChange={(e) => {setSeacrh(e.target.value); buscador(data,search)}}/>
            </div>
            <div>
                <div>
                    <br />
                    <button type="submit" id="next" onClick={nextpage}>siguiente</button>
                    <button type="submit" id="next" onClick={backpage}>anterior</button>
                    <button disabled="disabled">{pag}</button>
                </div>
                <div>
                    <h3>Obteniendo monedas...</h3>
                </div>
            </div>
            </div>
        )
    }
    return (
        <div>
            <div>
                <h1>Criptomonedas disponibles</h1>
                <h5>Coortesia de CoinGekco</h5>
                <h4><Link to='/mycoins'>Criptomonedas favoritas</Link></h4>            
            </div>
            <div>
                <input type="text" placeholder="Busca una moneda!" id="buscador" onChange={e => {setSeacrh(e.target.value); buscador(data,search)}}/>
            </div>
            <div>
                <div>
                    <br />
                    <button type="submit" id="next" onClick={nextpage}>siguiente</button>
                    <button type="submit" id="next" onClick={backpage}>anterior</button>
                    <button disabled="disabled">{pag}</button>
                </div>
                <div>
                    <table>
                        <thead>
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
                                    <th scope="row">{moment(result.last_updated).fromNow()}</th>
                                    <th scope="row"><div><img src={result.image} alt={result.id} style={{width: '15%'}}/></div></th>  
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
