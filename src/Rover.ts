import Motion from "./Motion";

export default class Rover {
  private x: number;
  private y: number;
  private facingDirection: String;
  private circularArrayOfDirections: String[] = [
    "North",
    "East",
    "South",
    "West",
  ];
  constructor(x: number, y: number, facingDirection: String) {
    this.x = x;
    this.y = y;
    this.facingDirection = facingDirection;
  }

  public getPosition(): String {
    return `${this.x} ${this.y} ${this.facingDirection}`;
  }

  public move(movementChar: String): String {
    if (movementChar === "F" || movementChar == "B") {
      //movement on axis
      let nextMotion: Motion = this.getMotion();
      if (movementChar === "B") {
        nextMotion.val = nextMotion.val * -1;
      }
      if (nextMotion.axis === "y") {
        this.y = this.y + nextMotion.val;
      } else {
        this.x = this.x + nextMotion.val;
      }
    } else if (movementChar === "L" || movementChar === "R") {
      const preOrNext: number = movementChar === "L" ? 7 : 9;
      const currentIndex: number = this.circularArrayOfDirections.indexOf(
        this.facingDirection
      );
      this.facingDirection =
        this.circularArrayOfDirections[(currentIndex + preOrNext) % 4];
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
  public setRover(x: number, y: number, facingDirection: String) {
    this.x = x;
    this.y = y;
    this.facingDirection = facingDirection;
  }
  private getMotion(): Motion {
    switch (this.facingDirection) {
      case "North":
        return new Motion(1, "y");
      case "South":
        return new Motion(-1, "y");
      case "East":
        return new Motion(1, "x");
      case "West":
        return new Motion(-1, "x");
      default:
        return null;
    }
  }
}
