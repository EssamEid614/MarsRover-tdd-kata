import { marsRover, newApp } from "../app";
import request from "supertest";
import Rover from "../Rover";

const app = newApp();

describe.each([
  [
    0,
    0,
    "North",
    [
      ["F", "0 1 North"],
      ["B", "0 -1 North"],
      ["L", "0 0 West"],
      ["R", "0 0 East"],
      ["FF", "0 2 North"],
      ["BB", "0 -2 North"],
      ["LL", "0 0 South"],
      ["LLLLLLLL", "0 0 North"],
      ["RFLFFFFFLLLRFB", "1 3 North Stopped"], //this should hit an obstacle
    ],
  ],
  [
    0,
    0,
    "South",
    [
      ["F", "0 -1 South"],
      ["B", "0 1 South"],
      ["L", "0 0 East"],
      ["R", "0 0 West"],
      ["FF", "0 -2 South"],
      ["BB", "0 2 South"],
      ["LL", "0 0 North"],
      ["LLLLLLLL", "0 0 South"],
    ],
  ],
  [
    0,
    0,
    "East",
    [
      ["F", "1 0 East"],
      ["B", "-1 0 East"],
      ["L", "0 0 North"],
      ["R", "0 0 South"],
      ["FF", "2 0 East"],
      ["BB", "-2 0 East"],
      ["LL", "0 0 West"],
      ["LLLLLLLL", "0 0 East"],
    ],
  ],
  [
    0,
    0,
    "West",
    [
      ["F", "-1 0 West"],
      ["B", "1 0 West"],
      ["L", "0 0 South"],
      ["R", "0 0 North"],
      ["FF", "-2 0 West"],
      ["BB", "2 0 West"],
      ["LL", "0 0 East"],
      ["LLLLLLLL", "0 0 West"],
    ],
  ],
  [
    4,
    2,
    "East",
    [
      ["FLFFFRFLB", "6 4 North"],
    ],
  ],
])(
  "Testing Robot with initial conditions x:%i, y:%i facing %s",
  (
    initialX: number,
    initialY: number,
    initialDirection: string,
    testCases: string[][]
  ) => {
    beforeEach(() => {
      //before each time a test case runs , reset the rover position so the output can be easily predicted
      marsRover.setRover(initialX, initialY, initialDirection);
    });
    afterEach(() => {
      //after all the tests run , ensure that the position is returned correctly
      let position: String = marsRover.getPosition();
      expect(position).toMatch(
        new RegExp("^-?\\d+ -?\\d+ (North|South|East|West)$")
      );
    });
    test.each(testCases)(
      `testing facing ${initialDirection} with command %s`,
      (a, b) => {
        return request(app)
          .post("/moveRover")
          .send({ movementString: a })
          .expect(200, { roverPosition: b });
      }
    );
  }
);
