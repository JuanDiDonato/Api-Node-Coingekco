const express = require('express')
const app = express()
const morgan = require('morgan')
const CookieParser = require('cookie-parser')

//Server settings
app.set('port', 5000)
app.use(express.json())
app.use(CookieParser())
//Morgan settings
app.use(morgan('dev'))


//Routes
app.use(require('./routes/UserRoutes'),require('./routes/CriptoRoutes'))

app.listen(app.get('port'), ()=>{
    console.log('[+] Servidor iniciado en: http://localhost:'+app.get('port'))
})