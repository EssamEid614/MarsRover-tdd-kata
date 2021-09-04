import { newApp } from "../app"
import { marsRover } from "../app"

const app = newApp()

describe("Test robot initialization", () => {
  it("should respond with non Empty string containing position", () => {
    let initialPosition:String =marsRover.getPosition() 
    expect(initialPosition).toMatch(new RegExp("^-?\d+ -?\d+ North|South|East|West$"))

  })
})