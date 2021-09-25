import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register(props) {

    const [log, setLog] = useState(false)
    const [message, setMessage] = useState()
    const [errores, setErrores] = useState()

    const register = async e => {

        e.preventDefault()
        let name = document.getElementById('name').value;
        let surname = document.getElementById('surname').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let coin = document.getElementById('coin').value;

        const {data} = await axios.post('/register', {name,surname,username,password,coin}, {validateStatus:false})
        if(data.messages.error === true){
            setMessage(data.messages.message)
            setLog(true)
            setErrores(true)
        }else{
            setMessage(data.messages.message)
            setLog(true)
            setErrores(false)
        }
    }

    const alerta = () =>{
        if(errores === false){
            setTimeout(() => {
                setLog(false)
                props.history.push('/')
            }, 1500);
            return(    
                <div className="alerta-t">
                    <h6>{message}</h6>
                </div> 
            )
        }else{
            return(
                    <div className="alerta-f">
                        <h6>{message}</h6>
                    </div> 
            )
        }


    }


    return (
        <main>
            <header className="fondo">
                <div className="posicion">
                    <div className="durlock">
                        <div className="">
                            <h1>Registrate, es gratis!</h1>
                        </div>
                        <div>
                            {log ? alerta() : null}
                        </div>
                        <div className="form-group p-3" >
                                <input type="text" placeholder="name" id="name" className="input-home"/>
                                <input type="text" placeholder="surname" id="surname" className="input-home"/>
                                <input type="text" placeholder="username" id="username" className="input-home"/>
                                <input type="password" placeholder="password" id="password" className="input-home"/>
                                <input type="text" placeholder="coin preference (ej: usd, eur, ars)" className="input-home" id="coin"/>
                                <button type="submit" onClick={register} className="button-login">Registrarse</button>
                        </div>
                        <div>
                            <h4>¿Ya tenes una cuenta?, inicia sesion <Link to='/'>aca</Link>!</h4>
                        </div>
                    </div>
                </div>
            </header>
        </main>

    )
}
