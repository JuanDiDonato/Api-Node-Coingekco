//MySQL settgins
const mysql = require('mysql')
const {promisify} = require('util')
const {database} = require('./keys')
const pool = mysql.createPool(database)

pool.getConnection((error, connection) => {
    if (error){
        return console.log('[-] '+error);
    }
    if(connection){
        console.log('[+] Database connected');
        return connection.release()
    }
})

pool.query = promisify(pool.query)

module.exports=pool