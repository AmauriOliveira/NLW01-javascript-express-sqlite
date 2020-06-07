const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

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

server.get("/search", (request, response) => {
    return response.render("search-results.html");
});



server.listen(3000);