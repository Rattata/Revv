export class Clock  {
    private before: number;
    constructor(){
        this.before=  performance.now()

    }

    getDelta() : number {
        var now = performance.now();
        var delta = now - this.before;
        this.before = now;
        return delta;
    }
}