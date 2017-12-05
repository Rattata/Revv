import { Tile } from "./Tile"
import {Game } from "./Game"
import "reflect-metadata"
import  * as inversify from 'inversify'
import {ITest} from './ITest'

window.addEventListener('DOMContentLoaded', function () {
    var game = new Game(document.getElementById('main'))
})