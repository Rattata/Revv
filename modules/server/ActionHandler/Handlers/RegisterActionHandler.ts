import { IActionHandler } from "../IActionHandler";
import { IAction } from "../../../core/Actions/IAction";
import { ActionType } from "../../../core/Actions/ActionTypes";
import RegisterAction from "../../../core/Actions/RegisterAction";
import { injectable, inject } from "inversify";
import * as Models from "../../Model/"
import { LOBBY_STATE } from "../../../core/State/LobbyState"
import { Team } from "../../Model/";
import { Model } from "sequelize";


@injectable()
export default class RegisterActionHandler implements IActionHandler {
    handle(msg: IAction, done: (response: object, success : boolean )=> void): void {
        var registerMsg = msg as RegisterAction;
        var player: Models.Player = undefined;
        var team: Models.Team = undefined;
        var errmessage = undefined;
        
        var p_player = Models.Player.findCreateFind<Models.Player>({where: {id: registerMsg.playerId }});
        var p_lobby = Models.Team.findOrCreate<Models.Team>({ where: { state: LOBBY_STATE.OPEN }, attributes: [] });
        var p_all = Promise.all([p_lobby, p_player]);
        p_all.then((resolved) => {player = resolved[1].value[1]; team = resolved[2].value[1]; },
        (reject) => {
            done({"error":"error"}, false);
        });

        
        var team: Models.Team = undefined;
        Models.Team.findOrCreate<Models.Team>({ where: { state: LOBBY_STATE.OPEN }, attributes: [] })
            .spread<Models.Team>((result) => { team = result });




    };

    version(): string { return "1" };

    canHandler(actionType: ActionType): boolean {
        return false;
    };
}