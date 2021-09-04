export default class Rover{

    private x:number;
    private y:number;
    private facingDirection:String;
    
    constructor(x:number,y:number,facingDirection:String){
        this.x = x;
        this.y = y;
        this.facingDirection = facingDirection;
    }

    public getPosition():String{
        return `${this.x} ${this.y} ${this.facingDirection}`
    }

    public move(){
        
    }
    public getFacingDirection():String{
        return this.facingDirection
    }
    public getX():number{
        return this.x
    }
    public getY():number{
        return this.y
    }

}