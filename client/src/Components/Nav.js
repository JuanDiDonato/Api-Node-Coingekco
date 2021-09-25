import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import axios from 'axios'

export default function Nav(props) {

    const {user, isAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext)
    const logout = async () => {
        const {data} = await axios.get('/logout', {validateStatus:false})
        setUser(data.user)
        setIsAuthenticated(false)
    }

    return(
        <div>
                { isAuthenticated ? 
                    <div className="nav-coins">
                        <div><Link className="nav-link active" to="/coins">Cryptos</Link></div>
                        <div><Link className="nav-link active" to="/mycoins">Mis monedas</Link></div>      
                        <div className="user">{user.username}</div>
                        <div><Link className="nav-link active" to="/" onClick={logout}>Salir</Link></div>
                        
                    </div>
                : 
                <div className="nav-home">
                    <h3>Bienvenido!</h3>
                </div> 
                }
        </div>
    )

}
