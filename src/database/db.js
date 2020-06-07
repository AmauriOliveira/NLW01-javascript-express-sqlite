const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");
module.exports = db;
/*
db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        logo TEXT,
        name TEXT,
        phone TEXT,
        email TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
    `)
    const query = `INSERT INTO places (
                                    logo,
                                    name,
                                    phone,
                                    email,
                                    address,
                                    address2,
                                    state,
                                    city,
                                    items
                                    ) VALUES (?,?,?,?,?,?,?,?,?);`

    const values = ["https://bhrecicla.com.br/imagens/blogpost69.jpg",
        "Colectoria",
        "1699188-99188",
        "amauri@cregames.com",
        "Odair marques  mariana",
        "41",
        "Sao Paulo",
        "Ibate",
        "Lâmpadas, Pilhas e Baterias"]

    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
    }

    db.run(query, values, afterInsertData)

        db.all('SELECT * FROM PLACES', function (err, rows) {
            if (err) {
                return console.log(err);
            }
            console.log("Aki esta os registros");
            console.log('====================================');
            console.log(rows);
            console.log('====================================');
        })

        db.run('DELETE FROM places WHERE id = ?', [2],function(err){
            if (err) {
                return console.log(err);
            }
            console.log("apagado com sucesso");
        })

}); */