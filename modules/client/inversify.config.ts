// file inversify.config.ts
 
import { Container } from "inversify";
 
const myContainer = new Container();
// myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
 
export { myContainer };