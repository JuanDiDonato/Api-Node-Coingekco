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
        <div>
            <div>
                <h1>Registrate, es gratis!</h1>
            </div>
            <div>
                <form>
                    <input type="text" placeholder="name" id="name"/>
                    <input type="text" placeholder="surname" id="surname"/>
                    <input type="text" placeholder="username" id="username"/>
                    <input type="password" placeholder="password" id="password"/>
                    <input type="text" placeholder="coin preference (ej: usd, eur, ars)" id="coin"/>
                    <button type="submit" onClick={register}>register</button>
                </form>
            </div>
            <div>
                <h4>¿Ya tenes una cuenta?, inicia sesion <Link to='/'>aca</Link>!</h4>
            </div>
        </div>
    )
}
