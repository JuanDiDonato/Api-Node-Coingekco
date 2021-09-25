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
                console.log(data);
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
                    <div >
                        <div >
                            <h3>Aca se muestran las monedas que agregaste a favoritos</h3>
                        </div>
                        <div className="mx-auto col-md-7 mt-4 p-3 m-3  card">{VerticalBar()}</div>
                        <div className="p-3">
                            <input type="radio" className="m-1" name="orden" id="orden" onClick={() => coinsOrden(false)} />Descendente
                        </div>
                        <div>{log ? alerta() : null}</div>
                        <div className="grilla">
                            <div >
                                {
                                    
                                    mycoins.map(coin=>{
                                        return(
                                            <div key={coin.id} className="tarjeta">
                                                <img src={coin.image} alt={coin.id} />
                                                <h2>{coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}</h2>
                                                
                                                    <div>Precio USD: {coin.priceUSD}</div>
                                                    
                                                    <div>Precio EUR: {coin.priceEUR}</div>
                                                    <div>Precio en {user.coin}: {coin.priceUSER}</div>
                                                    {coin.priceCHANGE >= 0 ? <div style={{color: 'green'}}>Variacion 24hs: {coin.priceCHANGE}</div> : <div style={{color: 'red'}}>Variacion 24hs: {coin.priceCHANGE}</div> }
                                                    <div>Actualizada: {moment(coin.last_updated).fromNow()}</div>
                                                
                                                <div className="tarjeta-actions">
                                                <div style={{cursor:'pointer'}} onClick={() => deleteCoin(coin)}><i className="fa fa-trash-o " style={{cursor:'pointer'}}></i></div>
                                                <div style={{cursor:'pointer'}}><Link to={'/mycoin/'+coin.id}><i className="fa fa-plus "></i></Link></div>
                                                </div>
                                                
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </header>
            </main>
           
        )
        
    }
    
}
