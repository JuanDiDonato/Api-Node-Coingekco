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
            setUser(data.messages.user)
            if(data === 'Unauthorized'){
                alert('Datos erroneos')
            }else{
                if(data.messages.error === false){
                    setIsAuthenticated(data.messages.isAuthenticated)
                    setLog(true)   
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
            <header >
                <div className=" fondo" >
                    <div className="durlock" >
                        <div className="">
                            <h4>Por favor, inicie sesion para continuar</h4>
                            {log === true ? alerta() : null}
                        </div>
                            <div>
                                    <input type="text" placeholder="username" id="username" className="input-home"/>
                                    <input type="password" placeholder="password" id="password" className="input-home"/>
                                    <button type="submit" onClick={login} className="button-login">Iniciar sesion</button>
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
