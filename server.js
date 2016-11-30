var express = require("express"),
    cors = require('cors'),
    app = express();

var port = process.env.VCAP_APP_PORT || 8080;

function getList(queryStr, callback) {


    clearDBconnection.query(queryStr, function(err, rows, fields) {
    if (err) throw err;
    callback(rows)
    });

}

var mysql      = require('mysql');
var clearDBconnection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-04.cleardb.net',
  user     : 'bffc7e639d3ebd',
  password : '592aacc4',
  database : 'ad_08d31853cfcf804'
});

setInterval(function () {
    clearDBconnection.query('SELECT 1');
}, 5000);

app.use(cors());
app.use(express.static(__dirname + '/public'));


app.get("/carList", function(request, response){
    var id = request.query.id;
    var queryStr = "SELECT * from cars";
    var rowsResponse = null;

    response.writeHead(200, {"Content-Type": "text/plain"})
    console.log(queryStr);
    
    getList(queryStr, function(rows) {


        var objs = [];
        for (var i = 0;i < rows.length; i++) {
          objs.push({key: rows[i].key, name: rows[i].name, model: rows[i].model});
        }


        rowsResponse = JSON.stringify(objs);
        console.log(rowsResponse);

        response.end(JSON.stringify(objs)); 
    })


})

app.get("/add", function(request, response){
    var id = null;
    var make = request.query.make;
    var model = request.query.model;
    var queryStr = "INSERT INTO cars (cars.key,cars.name,cars.model) VALUES ('"+id+"','"+make+"','"+model+"')";

    response.writeHead(200, {"Content-Type": "text/plain"})
    console.log(queryStr);

    clearDBconnection.query(queryStr, function(err, rows, fields) {
    if (err) throw err;
    });



    response.end("deleted!\n");
})

app.get("/remove", function(request, response){
    var id = request.query.id;
    var queryStr = "DELETE from cars WHERE cars.key = "+id;

    response.writeHead(200, {"Content-Type": "text/plain"})
    console.log(queryStr);

    clearDBconnection.query(queryStr, function(err, rows, fields) {
    if (err) throw err;
    });


    response.end("deleted!\n");
})

app.listen(port);

require("cf-deployment-tracker-client").track();

