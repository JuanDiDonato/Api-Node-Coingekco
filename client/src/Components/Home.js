import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'


export default function Home(props) {

    const {setIsAuthenticated, setUser} = useContext(AuthContext)
    const [log, setLog] = useState(false)

    const login = async e => {
        e.preventDefault()
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;   
        if(username === '' || username ===null || password === '' || password === null){
            alert('Por favor complete todos los campos')
        }else{
            const {data} = await axios.post('/login', {username,password}, {validateStatus:false})
            if(data === 'Unauthorized'){
                alert('Datos erroneos')
            }else{
                if(data.messages.error === false){
                    setLog(true)   
                    setIsAuthenticated(data.messages.isAuthenticated)
                    setUser(data.messages.user)
                }
            }
        }
    }

    const alerta = () =>{
        setTimeout(() => {
            setLog(false)
            props.history.push('/coins')
        }, 1500);
        return(
            <div className="alerta">
                <h6>Ingreso correctamente</h6>
            </div>
        )
    }


    return (
        <main>
            <header className="fondo">
                <div className="posicion">
                    <div className="carta" >
                        <div className="">
                            <h1>Bienvenido</h1>
                            <h4>Por favor, inicie sesion para continuar</h4>
                            {log === true ? alerta() : null}
                        </div>
                            <div className=" ">
                                    <input type="text" placeholder="username" id="username" className=""/>
                                    <input type="password" placeholder="password" id="password" className=""/>
                                    <button type="submit" onClick={login} className="">Iniciar sesion</button>
                            </div>
                        <div>
                            <h4>¿No tenes una cuenta?, registrate <Link to='/register'>aca</Link>!</h4>
                        </div>
                    </div>
                </div>
            </header>
        </main>
        
    )
}
