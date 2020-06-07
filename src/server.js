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
    const { } = request.body;
    return response.send("0k").status(201);
});


server.get("/search", (request, response) => {

    db.all('SELECT * FROM PLACES', function (err, rows) {
        if (err) {
            return console.log(err);
        }
        const total = rows.length;
        return response.render("search-results.html", { places: rows, total });
    });
});



server.listen(3000);