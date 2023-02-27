# ft_transcendence

42 school [subject](https://cdn.intra.42.fr/pdf/pdf/68431/en.subject.pdf).

In this project we have to create a website that allows playing pong, login via 42API as 42student, see profiles, chat in DM or channel, have two-factor authentication and more...<br>
This website is a single page application, with backend written in NestJS, database used being PostgreSQL and frontend written in Typescript React. We use docker-compose to launch the app with frontend, backend and database being in separate containers.

### Run
```
docker-compose up --build
```

Usually the .env should be added and not be present in this repository. However we let it inside this repository because being an exercise this is not dangerous. 

### TODOs left
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

* Alessio:
  - [x] docker-compose
  - [x] API KEYS in .env
<br>

* Other:
  * CSS
    - [x] css positioning?
    - [x] profile extra css? buttons to display ?
    - [x] clean message chat css/material-ui?
    - [x] review profile and message css
  * Potential bugs
    - [x] change state "in game" vs "search game" & online/offline
    - [x] Change state and remove active game after refresh/back/close-tab?
    - [x] User refresh during game, what happen to other player/live-viewers and match-history??
    - [x] User refresh at end of game? MatchHistory?
    - [x] User already connected when creating account from intra 42
    - [x] User logs in multiple times on different pages? (can create bugs related to status...)
    - [x] BackButton while playing game? -> Only set backbutton after games finishes and pushes datas to database
    - [x] ban a user and directly after the user tries to access the channel -> Unable to recreate bug
    - [x] After some time of the ball fastening it slows down again?
    - [x] user demands game in chat returns in home menu and other player accepts
    - [x] Both users disconnect unexpectedly and come back to replay
    - [x] Watch live end of game
    - [x] Long names go out of scope game | game on safari font (set same font as rest website: Courier New) | change name with login
    - [x] Point does not stop in game, until ball slows down and point is given to one player
  * clean
    - [x] clean all console.log
  * additions?
	- [x] page with all live games
	- [x] On page with all live games also have a "ladder"
	- [x] if user clicks on own play invite in chat he deactivates the invite
	- [x] Let viewing user have a back button and do not remove the game in this case...
	- [x] separate user login (with encrypted password) independent of intra 42
  * test & reread pdf
