import {WaterHex, MountainHex, FlatlandHex} from "../Terrain"
import { ITerrain } from "../Terrain/ITerrain";
export class Distribution {
    distribution: Array<any>
    
    constructor(){
        var water = [20, WaterHex];
        var flatland = [3, FlatlandHex];
        var mountain = [20, MountainHex];
        var predist = [water, flatland, mountain]

        this.distribution = this.fillDistribution(predist);
    };

    private fillDistribution(predist : Array<any>){
        var dist = []
        predist.forEach(element => {
            for (var i = 0; i < element[0]; i++) {
                dist.push(element[1]);
            }
        });
        return dist;
    }

    pickRandom(): ITerrain{
        var terrain = this.distribution[Math.round((this.distribution.length - 1 )* Math.random()) ]
        return terrain 
    }
    
}