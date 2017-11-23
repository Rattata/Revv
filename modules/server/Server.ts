//IoC
import {Sequelize} from "sequelize-typescript"
import {myContainer} from "./inversify.config";
import "reflect-metadata";
import * as Models from "./Model/"
import * as _ from "lodash";
import importToArray from "import-to-array";
import { TYPES } from "./server.types";
import { ActionRouter } from "./ActionHandler/ActionRouter";
import { IActionHandler } from "./ActionHandler/IActionHandler";

//Database
import sqlite = require("sqlite3");
var DB = new sqlite.Database(":memory:");
const sequelize = new Sequelize({
        name: 'some_db',
        dialect: 'sqlite',
        username: 'root',
        password: '',
        storage: ':memory:'
})
sequelize.addModels(importToArray(Models))
sequelize.sync().done(
  (x) => {console.log(x); console.log("db init done");},
  (y) => {console.error(y)});

//webserver
var handler = myContainer.get<ActionRouter>(TYPES.ActionRouter);
import express = require('express');
var app = express();
import expressUws = require('express-uws');
var expressWs = expressUws(app);

app.use('/',express.static("./dist/app/"));

(app as any).ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    handler.route(msg);
  });
});
console.log("webserver init done");
 
app.listen(3000);