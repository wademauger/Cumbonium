var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var data = {};
data.text = "Swag box";

app.use(bodyParser.json()); // Support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // Support encoded bodies

app.use(express.static("public")); // Mount public folder

app.get("/random", function(req, res) {
   res.send(200, Math.random());
});

app.post("/text", function(req, res) {
    console.log(req.body);
    if (typeof req.body.input != 'undefined') {
        data.text += "<br />" + req.body.input;
    }
    res.status(200).send(data.text);
});

app.get("/text", function(req, res) {
    res.status(200).send(data.text);
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});