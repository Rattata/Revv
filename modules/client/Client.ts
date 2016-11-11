import { Tile } from "./Tile"
import {Game } from "./Game"
import "reflect-metadata"
import {injectable, inject} from 'inversify'
import{ITest} from './ITest'

window.addEventListener('DOMContentLoaded', function () {
    var geemu = new Game(document.getElementById('main'))
})

@injectable()
class Test implements ITest {
    public fight() {
        return "fight";
    }
}
