import {WaterTerrain, MountainTerrain, FlatlandTerrain} from "../Terrain"
import { ITerrain } from "../Terrain/ITerrain";
export class Distribution {
    distribution: Array<any>
    
    constructor(){
        var water = [20, WaterTerrain];
        var flatland = [3, FlatlandTerrain];
        var mountain = [20, MountainTerrain];
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