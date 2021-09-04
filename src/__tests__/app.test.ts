import { marsRover, newApp } from "../app";
import request from "supertest";
import Rover from "../Rover";

const app = newApp();

describe.each([
  [0,0,"North",
    [
      ["F", "0 1 North"],
      ["B", "0 -1 North"],
      ["L", "0 0 West"],
      ["R", "0 0 East"],
      ["FF", "0 2 North"],
      ["BB", "0 -2 North"],
      ["LL", "0 0 South"],
      ["LLLLLLLL", "0 0 North"],
    ],
  ],
  [0,0,"South",
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
    test.each(testCases)("testing facing North with command %s", (a, b) => {
      return request(app)
        .post("/moveRover")
        .send({ movementString: a })
        .expect(200, { roverPosition: b });
    });
  }
);
