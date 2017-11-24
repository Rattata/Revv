//IoC
import { Sequelize } from "sequelize-typescript"
import { myContainer } from "./inversify.config";
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
var p_db = new Promise((resolve, reject) => {
  const sequelize = new Sequelize({
    name: 'some_db',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: ':memory:'
  })
  sequelize.addModels(importToArray(Models))
  sequelize.sync().done(
    (success) => { console.log("db init done"); resolve(); },
    (failure) => { console.error(failure); reject(); });
})


//webserver
import express = require('express');
var app = express();
import expressUws = require('express-uws');
import { ActionType } from "../core/Actions/ActionTypes";
var expressWs = expressUws(app);
function ws() {
  var router = myContainer.get<ActionRouter>(TYPES.ActionRouter);

  app.use('/', express.static("./dist/app/"));
  (app as expressUws).ws('/ws', function (ws, req) {
    ws.on('message', function (msg) {
      router.route(msg, ws);
    });
    ws.on('close', function () {
      var handler = myContainer.getNamed<IActionHandler>(TYPES.IActionHandler, ActionType.RegisterAction);
    })
  });
  console.log("webserver init done");
  app.listen(3000);
};

p_db.then(() => {
  ws();
}, (err) => {
  console.log(err);
})
