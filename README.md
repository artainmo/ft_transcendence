# ft_transcendence


* artainmo:
  - [x] /database -> create the database in the backend
  - [x] /routes -> create the routes (module, controller, provider) for CRUD requests on database in backend
  - [x] /gateway -> Create server-side websockets in the backend for chat and game
  - [x] Make backend launch
  - [x] Make frontend launch
  - [x] /api -> create api calls from frontend to interact with database
  - [x] /gateway -> Create client-side web socket functions for chat and game
  - [x] Login option with OAuth system of 42 intranet
  - [x] Finish the chat
  - [x] encrypt password
  - [x] 2FA
  - [x] Through the chat interface users should be able to ask other players to do a Pong match
  - [x] Through the chat interface users must be able to see other players profiles
  - [x] On profile next to disconnected/connected add "in game"
  - [x] Add button next to "in game" to view the game live
  - [x] Each user has a match history
  - [x] base css
  - [x] protect against SQL injection (https://github.com/typeorm/typeorm/issues/3696) -> ORM is used without raw query string
  - [x] You must implement some kind of server-side validation for forms and any user input -> ParseIntPipe & ValidationPipe with class-validator
<br>

* Jules:
  - [x] Finish the game
  - [x] Multiple games can be played right after one another
  - [x] Other users can watch the game live without interfering in it.
  - [x] Game accepts different options(ballspeed/maps)
  - [x] Responsive game: setInterval (check window dimensions) -> if they change -> change state of game window dimensions appropriately
<br>

* Alissio:
  - [ ] docker-compose
  - [ ] API KEYS in .env
<br>

* Other:
  * CSS
    - [ ] css positioning?
    - [ ] profile extra css? buttons to display ?
    - [ ] clean message chat css/material-ui?
  * Potential bugs
    - [ ] change state "in game" vs "search game"
    - [ ] Change state after refresh/back/close-tab? not deleting a game after refresh?
    - [ ] User refresh during game, what happen to other player?? (block the refresh?)
    - [ ] User logs in multiple times on different pages? (can create bugs related to status...)
    - [x] BackButton while playing game? -> Only set backbutton after games finishes and pushes datas to database
    - [x] ban a user and directly after the user tries to access the channel -> Unable to recreate bug
  * clean
    - [ ] clean all console.log
  * additions?
	- [ ] page with all live games
	- [ ] separate user login (with encrypted password) independent of intra 42
  * test & reread pdf
