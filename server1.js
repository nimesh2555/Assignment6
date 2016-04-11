var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var w, l;


var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    client.EXISTS('losses', function(err, reply) {
        if (reply === 1) {} else {
            client.set('losses', '0', function(err, reply) {
                console.log(reply);
            });

            client.set('wins', '0', function(err, reply) {
                console.log(reply);
            });
        }

    });

    app.use(express.static('.'));
    app.get('/', function(req, res) {
        res.sendFile(__dirname + "/" + "input1.html");
    });

    app.get('/stats', function(req, res) {

        client.get('wins', function(err, reply) {
            console.log("wins " + reply);
            w = reply;

            client.get('losses', function(err, reply) {
                console.log("losses " + reply);
                l = reply;

                res.send(JSON.stringify({
                    "wins": w,
                    "losses": l
                }));
            });
        });
    });

    app.use(bodyParser.json());

    app.post('/Flip', function(request, response) {


        var x = (Math.random() * 1) + 0;
        console.log(x);
        if (x >= 0.5) {
            if ((request.body.call == "heads")) {
                console.log("wins head");
                response.send(JSON.stringify({
                    "result": "wins"
                }));


                client.incr('wins', function(err, reply) {
                    console.log("wins " + reply);
                });

            } else {
                console.log("losses head");
                response.send(JSON.stringify({
                    "result": "losses"
                }));


                client.incr('losses', function(err, reply) {
                    console.log("losses " + reply);
                });
            }
        } else {
            if ((request.body.call == "tails")) {
                response.send(JSON.stringify({
                    "result": "wins"
                }));
                console.log(" win tail");


                client.incr('wins', function(err, reply) {
                    console.log("wins " + reply);
                });
            } else {
                console.log("losses tail");
                response.send(JSON.stringify({
                    "result": "losses"
                }));


                client.incr('losses', function(err, reply) {
                    console.log("losses " + reply);
                });
            }
        }

    });

    app.delete('/stats', function(request, response) {
        
         client.set('losses', '0', function(err, reply) {
         console.log("reset");
        });
        client.set('wins', '0', function(err, reply) {
            console.log("reset");
 });
        response.send(JSON.stringify({
                    "result": "successfull reset"
                }));


    });

});


app.listen(3000);