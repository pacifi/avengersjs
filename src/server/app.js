/**
 * Created by pacifi on 10/23/17.
 */

//setup

var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");


//configuracion

app.use(morgan('dev')); //hacer un log de cada request de mi App
app.use(bodyParser.urlencoded({extended: true})); //parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse application/json
app.use(favicon(__dirname + '/favicon.ico'));

app.use('/', express.static('./src/client')); // Setea los archivos estatico a src client

// application

app.get('*', function (req, res) {
    res.sendfile('./src/client/index.html'); //carga el unico archivi de vista (angular maneja los cambios de las paginas atraves esta pagina en el frontend)
});

//listen (la app comienza en el puerto 8000)
app.listen(8000);

console.log("App lostening on port 8000");
