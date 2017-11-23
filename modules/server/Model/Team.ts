import {Table, Column, Model, PrimaryKey, HasMany} from 'sequelize-typescript';

@Table
class Team extends Model<Team> {
 
  @Column
  name: string;
}

export {Team}