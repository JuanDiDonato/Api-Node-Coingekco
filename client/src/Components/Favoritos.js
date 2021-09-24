import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'
import { AuthContext } from '../context/AuthContext';




export default function Favoritos() {

    const {user} = useContext(AuthContext);
    const [log, setLog]= useState(false)
    const [message, setMessage] = useState()
    const [rev, setRev] = useState(false)
    const [mycoins, setMycoins] = useState([])
    //const [usercoin, setUsercoin] = useState()

    useEffect(() => {
        const MyCoins = async () => {
            const { data } = await axios.get('/favcoins', { validateStatus: false })
            if (data.messages.error === false) {
                setMycoins(data.messages.coins)
            }  
        }
        // const User = async () => {
        //     const {data} = await axios.get('/data', {validateStatus:false})
        //     setUsercoin(data.coin)
        // }
        MyCoins()
        //User()
        //eslint-disable-next-line
    }, [])

    const alerta = () =>{
        setTimeout(() => {
            setLog(false)
        }, 2000);
        return(
            <div className="alert alert-dark col-md-4 mx-auto">
                <h6>{message}</h6>
            </div>
        )
    }


    const coinsOrden = (value) => {
        if(rev === false){
            setRev(true)
            const MyCoinsOrder = mycoins.sort(((a, b) => b.priceUSER - a.priceUSER));
            setMycoins(MyCoinsOrder)
        }else{
            setRev(false)
            const MyCoinsOrder = mycoins.sort(((a, b) => a.priceUSER - b.priceUSER ));
            setMycoins(MyCoinsOrder)
        }
    }
    const deleteCoin = async (coin) => {
        const res = await axios.post('/delete', {'coin' : coin.id}, {validateStatus:false})
        if(res.data.messages.error === true){
            setLog(true)
            setMessage(res.data.messages.message)
        }else{
            setLog(true)
            setMessage(res.data.messages.message)
            if(mycoins.length === 1){
                setMycoins([])
            }else{
                const { data } = await axios.get('/favcoins', { validateStatus: false })
                if (data.messages.error === false) {
                    setMycoins(data.messages.coins)
    
                }
            }
            
        }
    }

    let CoinNames = mycoins.map(names => names.id)
    let CoinValue = mycoins.map(names => names.priceUSER)
    const data = {
        labels: CoinNames,
        datasets: [
          {
            label: 'Precio',
            data:   CoinValue,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      const VerticalBar = () => (
        <>
          <div className='header'>
            <h5 className='title'>Precio de tus monedas</h5>
          </div>
          <Bar data={data} />
        </>
      );
      
    if(mycoins.length === 0){
        return(
            <main>
                <header className="fondo-NOcoins">
                    <div className="container mt-5">
                        <h2>Aca se muestran las monedas que agregaste a favoritos</h2>
                        <h4>Estamos obteniendo los datos de sus monedas. Si no carga ningun dato, puede que no tenga ninguna moneda agregada.
                            Si ya tiene monedas en favoritos, por favor espere.
                        </h4>
                        <i className=" fa fa-circle-o-notch fa-spin fa-4x"></i>
                    </div>
                </header>
            </main>
                
            )
    }else{
        return (
            <main>
                <header className="fondo-coins">
                    <div className="col-md-10 mx-auto">
                        <div className="mt-5">
                            <h3>Aca se muestran las monedas que agregaste a favoritos</h3>
                        </div>
                        <div className="mx-auto col-md-7 mt-4 p-3 m-3  card">{VerticalBar()}</div>
                        <div className="p-3">
                            <input type="radio" className="m-1" name="orden" id="orden" onClick={() => coinsOrden(false)} />Descendente
                        </div>
                        <div>{log ? alerta() : null}</div>
                        <div className="col-md-12">
                            <div>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Criptomoneda</th>
                                        <th scope="col">Simbolo</th>
                                        <th scope="col"><i className="fa fa-usd mr-1"></i>USD</th>
                                        <th scope="col"><i className="fa fa-eur mr-1"></i>EUR</th>
                                        <th scope="col">{'Precio '+ user.coin}</th>
                                        <th scope="col"><i className="fa fa-clock-o mr-1"></i>Variacion 24hs</th> 
                                        <th scope="col"><i className="fa fa-clock-o mr-1"></i>Ultima actualizacion</th>
                                        <th scope="col">Logo</th>
                                        <th scope="col"><i className="fa fa-minus-circle mr-1"></i>Borrar</th>
                                        <th scope="col"><i className="fa fa-info-circle mr-1"></i>Info</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        mycoins.map(coin => {
                                            return (
                                                <tr key={coin.id} className="text-light">
                                                    <th scope="row" >{coin.id}</th>
                                                    <th scope="row">{coin.symbol}</th>
                                                    <th scope="row">{coin.priceUSD}</th>
                                                    <th scope="row">{coin.priceEUR}</th>
                                                    <th scope="row">{coin.priceUSER}</th>
                                                    {coin.priceCHANGE >= 0 ? <th scope="row" style={{color: 'green'}}>{coin.priceCHANGE}</th> : <th scope="row" style={{color: 'red'}}>{coin.priceCHANGE}</th> }
                                                    <th scope="row">{moment(coin.last_updated).fromNow()}</th>
                                                    <th scope="row"><div><img src={coin.image} alt={coin.id} /></div></th>
                                                    <th scope="row"><div style={{cursor:'pointer'}} onClick={() => deleteCoin(coin)}><i className="fa fa-trash-o m-1" style={{cursor:'pointer'}}></i></div></th>
                                                    <th scope="row"><div style={{cursor:'pointer'}}><Link to={'/mycoin/'+coin.id}><i className="fa fa-plus m-1"></i></Link></div></th>
                                                </tr>
                                            )
                                        })
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
    
}
