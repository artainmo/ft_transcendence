# ft_transcendence

ft_transcendence tasks:<br>
/database -> create the database in the backend !<br>
/routes -> create the routes (module, controller, provider) for CRUD requests on database in backend !<br>
/gateway -> Create server-side websockets in the backend for chat and game !<br>
Make backend launch !<br>
Make frontend launch !<br>
/api -> create api calls from frontend to interact with database !<br>
/gateway -> Create client-side web socket functions for chat and game !<br>
Login option with OAuth system of 42 intranet !<br>
Finish the chat !<br>
encrypt password !<br>
2FA !<br>
Through the chat interface users should be able to ask other players to do a Pong match !<br>
Through the chat interface users must be able to see other players profiles !<br>
On profile next to disconnected/connected add "in game" !<br>
Add button next to "in game" to view the game live !<br>
Each user has a match history !<br>
base css !<br>
protect against SQL injection (https://github.com/typeorm/typeorm/issues/3696) -> ORM is used without raw query string !<br>
You must implement some kind of server-side validation for forms and any user input -> ParseIntPipe & ValidationPipe with class-validator !<br>

Jules:<br>
Finish the game !<br>
Multiple games can be played right after one another !<br>
Other users can watch the game live without interfering in it. !<br>
Game accepts different options(ballspeed/maps) !<br>
Responsive game: setInterval (check window dimensions) -> if they change -> change state of game window dimensions appropriately !

Alissio:<br>
docker-compose<br>
API KEYS in .env <br>

Other:<br>
* CSS
- css positioning? <br>
- profile extra css? <br>
- clean message chat css/material-ui?<br>
* Potential bugs
- change state "in game" vs "search game" <br>
- Change state after refresh? not deleting a game after refresh?<br>
- User logs in multiple times on different pages?<br>
- BackButton while playing game? -> Only set backbutton after games finishes and pushes datas to database <br>
- ban a user and directly after the user tries to access the channel 
* clean
- clean game.gateway <br>
- Validate incoming data in websockets <br>
* test & reread pdf <br>
