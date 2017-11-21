import express = require('express');
var app = express();
import expressUws = require('express-uws');
var expressWs = expressUws(app);
 
// app.use(function (req, res, next) {
//   console.log('middleware');
//   (req as any).testing = 'testing';
//   return next();
// });
 
(app as any).ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    
  });
});

 
app.use('/',express.static("../app"));
app.listen(3000);