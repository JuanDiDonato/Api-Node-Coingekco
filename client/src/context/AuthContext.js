import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const AuthContext = createContext();
// eslint-disable-next-line 
export default ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(() => {
        const verify = async () =>{
            const {data} = await axios.get('/authenticate', {validateStatus: false})
            console.log(data);
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        }
        verify()
    }, [])

    return (
        <div>
            {!isLoaded ? <h1>Cargando Aplicacion...</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )

}
