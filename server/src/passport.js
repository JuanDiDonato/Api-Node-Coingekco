const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtSrategy = require('passport-jwt').Strategy
const {ComparePassword} = require('./helpers/bcrypt')
const pool = require('./database/connection')

//Get token
const CookiExtractor = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token
}


passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
}, async (username, password, done) => {
    const row =   await pool.query('SELECT * FROM user WHERE username = ?', username)
    if(row.length===0){
        let message = '[-] User not found.'
        return done(null,false,message)
    }else{
        let user= row[0]
        const savedPassword = user.password
        const validPassword = await ComparePassword(password, savedPassword)
        if(validPassword){
            let message = '[+] Welcome '+user.username
            user = {'id_user': user.id_user,'name': user.name, 'surname':user.surname, 'username':user.username, 'coin': user.coin}
            return done(null,user,message)
        }else{
            let message = '[-] Credentials not found.'  
            return done(null,false,message)
        }
    }
}))

passport.use(new JwtSrategy({
    jwtFromRequest: CookiExtractor,
    secretOrKey : 'qu13r3s_l3ch3'
}, (payload, done) => {
    pool.query('SELECT * FROM user WHERE id_user = ?', [payload.sub.id_user], (error, user)=>{
        if(error)
            return done(error, false)
        if(user)
            return done(null, user)
        else
            return done(null, false)
    })
}))