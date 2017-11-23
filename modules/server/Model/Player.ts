import {Table, Column, Model, PrimaryKey, HasMany} from 'sequelize-typescript';
import { BelongsTo } from 'sequelize-typescript/lib/annotations/association/BelongsTo';
import { Team, User } from './index';

@Table
class Player extends Model<Player> {
 
  @Column
  name: string;

  @PrimaryKey
  id: number;
  
  @BelongsTo(()=> User)
  user: User;

  @BelongsTo(()=> Team)
  team: Team;
}

export {Player}