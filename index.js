var http = require('http');
var express = require('express');
var endPoints = require(__dirname + '/back_end/end_points.js');
var routes = require(__dirname + '/back_end/routes.js');
var bodyParser = require('body-parser')

var app = express();


/* Cors */
const cors = require('cors');
app.use(cors());
app.options('*', cors());


/* Body parser */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/* Middelwares and routing */
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use("/", endPoints.router);
app.use("/", routes.router);


/* Start Server */
var port = 8080;
var httpsServer = http.createServer(app);
httpsServer.listen(port, function(){
    console.log("server running at http://localhost:" + port)
});