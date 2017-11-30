import {WaterHex, MountainHex, FlatlandHex} from "../Terrain"
export class Distribution {
    distribution: Array<any>
    
    constructor(){
        var water = [20, WaterHex];
        var flatland = [3, FlatlandHex];
        var mountain = [20, MountainHex];
        var predist = [water, flatland, mountain]

        this.distribution = (function () {
            var dist = []
            predist.forEach(element => {
                for (var i = 0; i < element[1]; i++) {
                    dist.push(element[1]);
                }
            });
            return dist;
        })()
    };

    pickRandom(): Array<any>{
        return this.distribution[Math.round((this.distribution.length - 1 )* Math.random()) ]
    }
    
}