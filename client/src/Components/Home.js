import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home(props) {

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
                    alert(data.messages.message);
                    props.history.push('/coins')
                }
            }


            
        }

    }


    return (
        <div className="container col-md-8 mt-5">
            <div className="card">
                <div className="card-header">
                    <h1>Bienvenido</h1>
                    <h3>Por favor, inicie sesion para continuar</h3>
                </div>
                <div className="form-group p-3">
                        <input type="text" placeholder="username" id="username" className="form-control mb-1"/>
                        <input type="password" placeholder="password" id="password" className="form-control mb-1"/>
                        <button type="submit" onClick={login} className="btn btn-outline-primary btn-block">Iniciar sesion</button>
                </div>
                <div>
                    <h4>¿No tenes una cuenta?, registrate <Link to='/register'>aca</Link>!</h4>
                </div>
            </div>
        </div>
    )
}
