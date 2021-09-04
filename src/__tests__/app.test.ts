import { marsRover, newApp } from "../app";
import request from "supertest";
import Rover from "../Rover";

const app = newApp();
describe("Test robot position", () => {
  beforeEach(() => {
    //before each time a test case runs , reset the rover position so the output can be easily predicted
    marsRover.resetRover();
  });
  afterEach(() => {
    //after all the tests run , ensure that the position is returned correctly
    let position: String = marsRover.getPosition();
    expect(position).toMatch(
      new RegExp("^-?\\d+ -?\\d+ (North|South|East|West)$")
    );
  });

  test.each([
    ["F", "0 1 North"],
    ["B", "0 -1 North"],
    ["L", "0 0 West"],
    ["R", "0 0 East"],
    ["FF", "0 2 North"],
  ])("testing facing North with command %s", (a,b) => {
    return request(app)
      .post("/moveRover")
      .send({ movementString: a })
      .expect(200, { roverPosition:b });  
  });

  
});
