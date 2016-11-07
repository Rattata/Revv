var express = require('express'),
app = express(),
core = require('./dist/srv/core.js');

app.use(express.static('dist/app/'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
