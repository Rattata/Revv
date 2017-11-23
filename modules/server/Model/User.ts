import {Table, Column, Model, PrimaryKey, HasMany} from 'sequelize-typescript';

@Table
class User extends Model<User> {
 
  @Column
  name: string;
}

export {User}