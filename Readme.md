# Mars Rover TDD 
## Introduction

- My approach to solving the Mars Rover problem using tdd.
- this has a single api ```/moveRover``` which moves the rover and avoids obstacles by stopping before them.
- since Mars is a planet, you may find negative values.
## To build the docker image and run the application

```sh
docker build -t express-ts
docker run -p 8000:8000 express-ts
```
## To run the tests and see the test cases and their result 

```sh
docker exec container_name npm test
```
### ```API``` Guideline

- there is only 1 ```API``` which is ```/moveRover``` , make a post request to it with the body as a json like ```{"movementString":"RFFFLRFR"}``` and the Rover will respond with a ```JSON``` like so ```{"roverPosition":"5 9 North"}```
- If the rover hits an obstacle it will report back with stopped like so ```{"roverPosition":"5 9 North Stopped"}```
- The Rover initializes it self with the server starting to a random position and facing a random direction
