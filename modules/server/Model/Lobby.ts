import {Table, Column, Model, Default, PrimaryKey, HasMany} from 'sequelize-typescript';
import { Player } from './index';
import {LOBBY_STATE} from "../../core/State/LobbyState"


@Table
class Lobby extends Model<Lobby> {
 
  @Column
  name: string;

  @HasMany(()=> Player)
  players: Player[];
  
  @Column
  @Default(LOBBY_STATE.OPEN)
  state: LOBBY_STATE;
}

export {Lobby}