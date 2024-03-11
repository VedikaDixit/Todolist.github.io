const mysql = require('mysql');
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"todo_db"
})

const init = async() => {
    return await db.connect()
}

module.exports = {
    init, 
    db
}