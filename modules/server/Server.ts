var express = require('express');
  var app = express();
  var websocket = require('express-ws');(app);
websocket = websocket(app);
app.use(express.static('dist/app/'))

app.ws('/echo', function (ws, req) {
  ws.on('message', function (message) {
    ws.send('OK')
  })
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!')
})
