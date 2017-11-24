import { IActionHandler } from "./IActionHandler";
import { IAction } from "../../core/Actions/IAction";
import { ActionType } from "../../core/Actions/ActionTypes"
import * as Handlers from "./Handlers"
import { injectable, inject } from "inversify";
import importToArray from "import-to-array";
import { myContainer } from "../inversify.config"
import { TYPES } from "../server.types"

@injectable()
class ActionRouter {

    route(msg: string, ws: WebSocket) {

        var json_message = undefined;
        try {
            json_message = JSON.parse(msg);
        } catch (error) {
            ws.send("err"); return;
        }

        if (json_message != undefined || json_message.type == undefined) {
            ws.send("err"); return;
        }


        var handler = myContainer.getNamed<IActionHandler>(TYPES.IActionHandler, json_message.type);
        if (handler != undefined) {
            return handler.handle(json_message, ws, function (response: object, success?: boolean) {
                ws.send(response);
            });
        } else {
            console.error("no appropriate handler found for message!");
        }

    }

    version(): string {
        return "1.0";
    }
}

export { ActionRouter }