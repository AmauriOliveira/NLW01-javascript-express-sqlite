const express = require("express");
const server = express();
const nunjucks = require("nunjucks");
const db = require("./database/db");

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (request, response) => {
    return response.render("index.html", {
    });
});

server.get("/create", (request, response) => {
    return response.render("create-point.html");
});

server.post("/savepoint", (request, response) => {
    const { logo,
        name,
        phone,
        email,
        address,
        address2,
        state,
        city,
        items } = request.body;

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

    const values = [
        logo,
        name,
        phone,
        email,
        address,
        address2,
        state,
        city,
        items
    ];

    db.run(query, values, afterInsertData);

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return response.send("Error ao cadastrar");
        }
        console.log(this);
        return response.render("create-point.html", { saved: true });
    }
});

server.get("/search", (request, response) => {

    const search = request.query.search;

    if (search === "") {
        db.all(`SELECT * FROM PLACES`, function (err, rows) {
            if (err) {
                return console.log(err);
            }
            const total = rows.length;
            return response.render("search-results.html", { places: rows, total });
        });
    } else {
        db.all(`SELECT * FROM PLACES WhERE city LIKE '%${search}%'`, function (err, rows) {
            if (err) {
                return console.log(err);
            }
            const total = rows.length;
            return response.render("search-results.html", { places: rows, total });
        });
    }
});



server.listen(3000);