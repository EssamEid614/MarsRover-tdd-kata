/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { Express } from "express";
import Rover from "./Rover";
dotenv.config();
const FACING_DIRECTIONS: String[] = ["North", "South", "East", "West"];

const initialRandomX = Math.floor(Math.random() * 10);
const initialRandomY = Math.floor(Math.random() * 10);
const initialRandomDirectionIndex = Math.floor(
  Math.random() * FACING_DIRECTIONS.length
);
let marsRover: Rover = new Rover(
  initialRandomX,
  initialRandomY,
  FACING_DIRECTIONS[initialRandomDirectionIndex]
);
const obstacles = [
  [1, 4],
  [3, 5],
  [7, 4],
];
export { marsRover };
export function newApp(): Express {
  const app: Express = express();
  app.use(express.json());
  app.post("/moveRover", (req, res) => {
    let newPosition: String;
    try {
      const movementString: String = req.body.movementString;
    for (let i = 0; i < movementString.length; i++) {
      let oldPosition = marsRover.getPosition();
      let hitObstical: boolean = false;
      newPosition = marsRover.move(movementString[i]);
      for (let j = 0; j < obstacles.length; j++) {
        if (
          obstacles[j][0] === marsRover.getX() &&
          obstacles[j][1] === marsRover.getY()
        ) {
          newPosition = oldPosition + " Stopped";
          hitObstical = true;
          break;
        }
      }
      if (hitObstical) {
        break;
      }
    }
    res.status(200).send({ roverPosition: newPosition });
    } catch (error) {
      res.status(400)
    }
    
  });

  return app;
}
