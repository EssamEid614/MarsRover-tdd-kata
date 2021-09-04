import { newApp } from "./app";
import * as http from "http";

const app = newApp();

const PORT: number = parseInt(process.env.PORT as string, 10);

http.createServer({}, app).listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}...`);
});