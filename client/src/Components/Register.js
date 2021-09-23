import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register(props) {

    const register = async e => {

        e.preventDefault()
        let name = document.getElementById('name').value;
        let surname = document.getElementById('surname').value;
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        let coin = document.getElementById('coin').value;

        const {data} = await axios.post('/register', {name,surname,username,password,coin}, {validateStatus:false})
        if(data.messages.error === true){
            alert(data.messages.message)
        }else{
            alert(data.messages.message);
            props.history.push('/')
        }
    }



    return (
        <main>
            <header className="fondo">
                <div className="container col-md-8 mt-5">
                    <div className="card bg-light text-dark p-3">
                        <div className="card-title">
                            <h1>Registrate, es gratis!</h1>
                        </div>
                        <div className="form-group p-3" >
                                <input type="text" placeholder="name" id="name" className="form-control mb-1"/>
                                <input type="text" placeholder="surname" id="surname" className="form-control mb-1"/>
                                <input type="text" placeholder="username" id="username" className="form-control mb-1"/>
                                <input type="password" placeholder="password" id="password" className="form-control mb-1"/>
                                <input type="text" placeholder="coin preference (ej: usd, eur, ars)" className="form-control mb-1" id="coin"/>
                                <button type="submit" onClick={register} className="btn btn-primary btn-block">Registrarse</button>
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
