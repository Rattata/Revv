import { Tile } from "./Tile"
import {Game } from "./Game"
import "reflect-metadata"
import  * as inversify from 'inversify'

window.addEventListener('DOMContentLoaded', function () {
    document.getElementById("myBtn").addEventListener("click", function () {
        let el = document.getElementById("main"),
          rfs = el.requestFullscreen
            || el.webkitRequestFullScreen
            || (el as any).mozRequestFullScreen
            || (el as any).msRequestFullscreen
          ;
  
        rfs.call(el);
        
        game.engine.resize();
    });
    let game = new Game(document.getElementById('main'))
})