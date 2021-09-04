/**
 * Required External Modules
 */
 import * as dotenv from "dotenv";
 import express,{Express} from "express";

 dotenv.config();
 

 export function newApp(): Express {
   const app:Express = express();
   app.use(express.json());
   return app;
}
