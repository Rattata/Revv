import {Table, Column, Model, Default, PrimaryKey, HasMany} from 'sequelize-typescript';
import { Player } from './index';
import {LOBBY_STATE} from "../../core/State/LobbyState"


@Table
class Lobby extends Model<Lobby> {
 
  @Column
  name: string;

  @HasMany(()=> Player)
  players: Player[];
  
  @Default(LOBBY_STATE.OPEN)
  @Column
  state: number = LOBBY_STATE.OPEN;
}

export {Lobby}