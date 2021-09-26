import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import axios from 'axios'

export default function Nav() {

    const {user, isAuthenticated,setUser,setIsAuthenticated} = useContext(AuthContext)
    console.log(user);
    console.log(isAuthenticated);
    const logout = async () => {
        const {data} = await axios.get('/logout', {validateStatus:false})
        setUser(data.user)
        setIsAuthenticated(false)
    }

    return(
        <div>
                { isAuthenticated ? 
                    <div className="nav-coins">
                        <div><Link to="/coins"><i className="fab fa-bitcoin"></i>Cryptos</Link></div>
                        <div><Link to="/mycoins"><i className="fa fa-coins"></i>Mis monedas</Link></div>      
                        <div className="user">{user.username}</div> 
                        <div><Link to="/" onClick={logout}>Salir</Link></div>
                        
                    </div>
                : 
                <div className="nav-home">
                    <h3>Bienvenido!</h3>
                </div> 
                }
        </div>
    )

}
