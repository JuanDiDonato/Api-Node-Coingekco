import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Home(props) {

    const login = async e => {
        e.preventDefault()
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;    

        const {data} = await axios.post('/login', {username,password}, {validateStatus:false})
        if(data.messages.error === true){
            alert(data.messages.message)
        }else{
            alert(data.messages.message);
            props.history.push('/coins')
        }
    }


    return (
        <div>
            <div>
                <h1>Bienvenido</h1>
                <h3>Por favor, inicie sesion para continuar</h3>
            </div>
            <div>
                <form>
                    <input type="text" placeholder="username" id="username"/>
                    <input type="password" placeholder="password" id="password"/>
                    <button type="submit" onClick={login}>login</button>
                </form>
            </div>
            <div>
                <h4>¿No tenes una cuenta?, registrate <Link to='/register'>aca</Link>!</h4>
            </div>
        </div>
    )
}
