//IoC
import {myContainer} from "./inversify.config";
import { TYPES } from "./server.types";
import { ActionHandler } from "./ActionHandler/ActionHandler";
import { IActionHandler } from "./ActionHandler/IActionHandler";


//webserver
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
    var handler = myContainer.get<IActionHandler>(TYPES.IActionHandler);
    
    handler.handle(msg);
  });
});

 
app.use('/',express.static("../app"));
app.listen(3000);