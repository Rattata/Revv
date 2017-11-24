import { IActionHandler } from "../IActionHandler";
import * as Actions from "../../../core/Actions";
import { injectable, inject } from "inversify";
import * as Models from "../../Model/"
import { LOBBY_STATE } from "../../../core/State/LobbyState"
import { Team } from "../../Model/";
import { Model } from "sequelize";
import { PlayerSocketRepository } from "../../Repository/index";
import { TYPES } from "../../server.types";


@injectable()
export default class UnregisterActionHandler implements IActionHandler {

    @inject(TYPES.PlayerSocketRepository)
    playerSocketRepo: PlayerSocketRepository;


    handle(msg: Actions.IAction, ws: WebSocket, done: (response: object, success: boolean) => void): void {
        var registerMsg = msg as Actions.UnregisterAction;
        var errmessage = undefined;


        var p_player = Models.Player.findCreateFind<Models.Player>({ where: { id: registerMsg.playerId } });

        var p_lobby = Models.Team.findOrCreate<Models.Team>({ where: { state: LOBBY_STATE.OPEN } });

        var p_all = Promise.all([p_lobby, p_player]);
        p_all.then((resolved) => {

            var player: Models.Player = resolved[1].value[1];
            var team: Models.Team = resolved[2].value[1];

            this.playerSocketRepo.map.set(player.id, ws);

            ws.send(JSON.stringify(
                {
                    type: msg.type,
                    player_id: player.id,
                    team_id: team.id
                }));
            

        },
            (reject) => {
                console.log(reject);
                ws.send(JSON.stringify({ type: "error" }))
            });
    };

    version(): string { return "1" };

    canHandler(actionType: Actions.ActionType): boolean {
        return false;
    };
}