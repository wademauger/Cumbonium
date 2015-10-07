var express = require('express');
var app = express();
var data = {};

app.use(express.static("public"));

app.get("/random", function (req, res) {
   res.send(200, Math.random());
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});