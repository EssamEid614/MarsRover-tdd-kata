import Motion from "./Motion";

export default class Rover {
  private x: number;
  private y: number;
  private facingDirection: String;

  constructor(x: number, y: number, facingDirection: String) {
    this.x = x;
    this.y = y;
    this.facingDirection = facingDirection;
  }

  public getPosition(): String {
    return `${this.x} ${this.y} ${this.facingDirection}`;
  }

  public move(movementChar: String): String {
    if (movementChar === "F") {
      //movement on axis
      let nextMotion: Motion = this.getMotion();
      if (nextMotion.axis === "y") {
        this.y = this.y + nextMotion.val;
      } else {
        this.x = this.x + nextMotion.val;
      }
    }
    else{
        this.y=this.y-1
    }

    return this.getPosition();
  }
  public getFacingDirection(): String {
    return this.facingDirection;
  }
  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }
  public resetRover() {
    this.x = 0;
    this.y = 0;
    this.facingDirection = "North";
  }
  private getMotion(): Motion {
    switch (this.facingDirection) {
      case "North":
        return new Motion(1, "y");
      default:
        return null;
    }
  }
}
