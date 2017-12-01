import { IAction } from "../../core/Actions";

export class NetHandler {
    private ws : WebSocket
    constructor(){
        this.ws = new WebSocket("/echo");
        this.ws.onmessage = this.receive
    }
    
    send(action : IAction){
        if(this.ws.readyState == this.ws.OPEN){
            this.ws.send(action);
        } else {
            console.error("ws connection not open")
            if(this.ws.readyState == this.ws.CLOSED || this.ws.readyState == this.ws.CLOSING){
                throw "ws conneciton already closing"
            }
        }
    }

    receive(ev: MessageEvent){
        //route between game related -> GameScene
        //lobby related -> Lobby
    }

}