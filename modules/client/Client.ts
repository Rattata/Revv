import { Tile } from "./Tile"
import {Game } from "./Game"
import "reflect-metadata"
import  * as inversify from 'inversify'

window.addEventListener('DOMContentLoaded', function () {
    // document.getElementById('main').requestFullscreen()
    var game = new Game(document.getElementById('main'))
})