var express = require('express'),
  app = express(),
  websocket = require('express-ws')(app);

app.use(express.static('dist/app/'))

app.ws('/echo', function (ws, req) {
  ws.on('message', function (message) {
    ws.send('OK')
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
