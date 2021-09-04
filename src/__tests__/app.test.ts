import { marsRover, newApp } from "../app";
import request from "supertest";
import Rover from "../Rover";

const app = newApp();
describe("Test robot position", () => {
  beforeEach(() => {
    //before each time a test case runs , reset the rover position so the output can be easily predicted
    marsRover.resetRover()
  });
  afterEach(() => {
    //after all the tests run , ensure that the position is returned correctly
    let position: String = marsRover.getPosition();
    expect(position).toMatch(new RegExp("^-?\\d+ -?\\d+ (North|South|East|West)$"));
  });
  //Forwards While Facing North
  test("api should respond when asked to move forwards while facing north to add 1 to current Y ", () => {
    return request(app).post("/moveRover").send({movementString:"F"}).expect(200,{roverPosition:"0 1 North"})
  });
  //Backward while Facing North
  test("api should respond when asked to move forwards while facing north to subtract 1 to current Y ", () => {
    return request(app).post("/moveRover").send({movementString:"B"}).expect(200,{roverPosition:"0 -1 North"})
  });
  test("api should respond when asked to move Left from North to point West ", () => {
    return request(app).post("/moveRover").send({movementString:"L"}).expect(200,{roverPosition:"0 0 West"})
  });
});
