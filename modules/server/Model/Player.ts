import {Table, Column, Model, PrimaryKey, HasMany} from 'sequelize-typescript';
import { BelongsTo } from 'sequelize-typescript/lib/annotations/association/BelongsTo';
import { Team } from './index';

@Table
class Player extends Model<Player> {
 
  @Column
  name: string;

  @PrimaryKey
  @Column
  id: number;
  
  @BelongsTo(()=> Team)
  team: Team;
}

export {Player}