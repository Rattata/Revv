// file inversify.config.ts
import {TYPES} from "./types"
import { Container } from "inversify";
import { interfaces } from "inversify/dts/interfaces/interfaces";

const myContainer = new Container();


 
export { myContainer};