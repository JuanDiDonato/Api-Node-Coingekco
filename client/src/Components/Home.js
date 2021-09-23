import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function Home(props) {

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
            <div className="alert alert-success col-md-10 mx-auto p-1">
                <h6>Ingreso correctamente</h6>
            </div>
        )
    }


    return (
        <main>
            <header className="fondo">
                <div className="container col-md-8 mt-5">
                    <div className="card bg-light text-dark p-3" >
                        <div className="card-title">
                            <h1>Bienvenido</h1>
                            <h3>Por favor, inicie sesion para continuar</h3>
                            {log === true ? alerta() : null}
                        </div>
                            <div className="form-group p-3 ">
                                    <input type="text" placeholder="username" id="username" className="form-control mb-1"/>
                                    <input type="password" placeholder="password" id="password" className="form-control mb-1"/>
                                    <button type="submit" onClick={login} className="btn btn-primary btn-block">Iniciar sesion</button>
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
