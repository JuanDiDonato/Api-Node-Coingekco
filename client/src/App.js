import {BrowserRouter as Router, Route} from 'react-router-dom';
//Css
import './assets/css/main.css'
//Componentes
import Home from './Components/Home';
import Register from './Components/Register'
import Coins from './Components/Coins'
import Favoritos from './Components/Favoritos'
import Detalles from './Components/Detalles';
import Nav from './Components/Nav'

function App() {
  return (
    <div className="App">
        <Router>
          <Nav/>
          <Route exact path='/' component={Home}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/coins' component={Coins}/>
          <Route exact path='/mycoins' component={Favoritos}/>
          <Route exact path='/mycoin/:id' component={Detalles}/>
        </Router>
    </div>
  );
}

export default App;
