import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/es'



export default function Favoritos() {

    const [rev, setRev] = useState(false)
    const [mycoins, setMycoins] = useState([])
    const [coinsHis, setCoinsHis] = useState([])
    //const [usercoin, setUsercoin] = useState()


    useEffect(() => {
        const MyCoins = async () => {
            const { data } = await axios.get('/favcoins', { validateStatus: false })
            if (data.messages.error === false) {
                setMycoins(data.messages.coins)
            }  
            const data2 = await axios.post('/favhistoryall', {'crypto':data.messages.coins},  { validateStatus: false })
            let array = data2.data
            let array2 = []
            array.forEach(element => {
                array2.push(element.price.data.prices)
                if(array2.length === array.length){
                    setCoinsHis(array2)}

            });
        }
        // const User = async () => {
        //     const {data} = await axios.get('/data', {validateStatus:false})
        //     setUsercoin(data.coin)
        // }
        MyCoins()
        //User()
        //eslint-disable-next-line
    }, [])


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
            alert(res.data.messages.message)
        }else{
            alert(res.data.messages.message)
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

    let coins = coinsHis.map(crypt => crypt.map(cry => cry))
    let dataLength = coinsHis.map(crypt => moment(crypt[0]).fromNow()) 
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
            <h1 className='title'>Precio</h1>
   
          </div>
          <Bar data={data} />
        </>
      );
      

    if(mycoins.length === 0){
        return(
                <div>
                    <h1>Favoritos</h1>
                    <h2>Aca se muestran las monedas que agregaste a favoritos</h2>
                    <h3>Para volver al inicio pulse <Link to="/coins">aqui</Link></h3>
                    <h3>Estamos obteniendo los datos de sus monedas. Si no carga ningun dato, puede que no tenga ninguna moneda agregada.
                        Si ya tiene monedas en favoritos, por favor espere.
                    </h3>
                </div>
            )
    }else{
        return (
            <div>
                <div>
                    <h1>Favoritos</h1>
                    <h2>Aca se muestran las monedas que agregaste a favoritos</h2>
                    <h3>Para volver al inicio pulse <Link to="/coins">aqui</Link></h3>
                </div>
                <div style={{width: '70%'}}>{VerticalBar()}</div>
                <div>
                    <input type="checkbox" name="orden" id="orden" onClick={() => coinsOrden(false)} />Descendente
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Criptomoneda</th>
                                <th scope="col">Simbolo</th>
                                <th scope="col">Precio usd</th>
                                <th scope="col">Precio eur</th>
                                {/* <th scope="col">{'Precio '+ usercoin}</th>
                                <th scope="col">{'Variacion 24hs en '+ usercoin}</th> */}
                                <th scope="col">Ultima actualizacion</th>
                                <th scope="col">Logo</th>
                                <th scope="col">Borrar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mycoins.map(coin => {
                                    return (
                                        <tr key={coin.id}>
                                            <th scope="row" >{coin.id}</th>
                                            <th scope="row">{coin.symbol}</th>
                                            <th scope="row">{coin.priceUSD}</th>
                                            <th scope="row">{coin.priceEUR}</th>
                                            <th scope="row">{coin.priceUSER}</th>
                                            {coin.priceCHANGE >= 0 ? <th scope="row" style={{color: 'green'}}>{coin.priceCHANGE}</th> : <th scope="row" style={{color: 'red'}}>{coin.priceCHANGE}</th> }
                                            <th scope="row">{moment(coin.last_updated).fromNow()}</th>
                                            <th scope="row"><div><img src={coin.image} alt={coin.id} /></div></th>
                                            <th scope="row"><div style={{cursor:'pointer'}} onClick={() => deleteCoin(coin)}>Eliminar</div></th>
                                            <th scope="row"><div style={{cursor:'pointer'}}><Link to={'/mycoin/'+coin.id}> Mas detalles</Link></div></th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
        
    }
    
}
