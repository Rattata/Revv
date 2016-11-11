import * as express from 'express'
var app = express()
import * as ws from 'ws'
import * as http from 'http'
import * as url from 'url'

var WebSocketServer = ws.Server
var wss = new WebSocketServer({ "server": http.createServer() })


wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

app.use(express.static("../app"))
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
