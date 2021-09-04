/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import express,{Express} from "express";
 import Rover from './Rover'
 dotenv.config();
 const FACING_DIRECTIONS:String[] = ["North","South","East","West"]

 const initialRandomX = Math.floor(Math.random()*10)
 const initialRandomY = Math.floor(Math.random()*10)
 const initialRandomDirectionIndex =Math.floor(Math.random()*FACING_DIRECTIONS.length)
 let marsRover:Rover = new Rover(initialRandomX,initialRandomY,FACING_DIRECTIONS[initialRandomDirectionIndex])

 export {marsRover};
 export function newApp(): Express {
   const app:Express = express();
   app.use(express.json());
   app.post("/moveRover",(req,res)=>{
      res.send(200)
   })
   return app;
}
