import { newApp } from "../app"
import { marsRover } from "../app"
import  request from "supertest"

const app = newApp()

describe("Test robot position", () => {
    
    afterEach(()=>{
        //after all the tests run , ensure that the position is returned correctly
        console.log("after each")
        let position:String =marsRover.getPosition() 
        expect(position).toMatch(new RegExp("^-?\d+ -?\d+ North|South|East|West$"))
      })

})

