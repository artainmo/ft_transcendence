import React, { useState, useEffect } from 'react';
import { GameDto } from "../../api/games/dto/game.dto";
import { addGame, getAllGames, getGame as GetGame, removeGame, updateGame } from "../../api/games/games.api";
import { UserDto } from "../../api/user/dto/user.dto";
import PongGame from "./gameFunc/PongGame";
// import StartGame from "./gameFunc/shapes";
// import { listen, joinRoom, leaveRoom, send, disconnect } from "../../websocket/game/game.socket";


const dataBaseMaps = ['black', 'white', 'winter', 'summer', 'night'];

interface preGamePageProps {
  getGame: "create" | "join" | null,
  changeGetGame: (page: "create" | "join" | null) => void,
  game: GameDto
  changeGame: (newGame: GameDto | null) => void
}

interface joinGameProps {
  user: UserDto,
  changeGetGame: (page: "create" | "join" | null) => void,
  changeGame: (newGame: GameDto | null) => void
}

interface createGameProps {
  user: UserDto,
  changeGetGame: (page: "create" | "join" | null) => void,
  changeGame: (newGame: GameDto | null) => void
}

interface playProps {
	user: UserDto,
	changeMenuPage: (newMenuPage: string) => void
}

const PreGamePage: React.FC<preGamePageProps> = ({ getGame, changeGetGame, game, changeGame }) => {
  const [waitingEffect, setWaitingEffect] = useState<number>(0);

  useEffect(()=>{
    const verifySecondPlayer: () => void = async () => {
      const myGame = await GetGame(game.id);
      if (myGame!.user2 !== null) {
        removeGame(myGame!.id);
        changeGame(myGame);
      }
    }
    const interval = setInterval(verifySecondPlayer, 2000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    const interval = setInterval(() => {
      setWaitingEffect((prev) => prev === 3 ? 0 : prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [])

  return (<div>
            <button onClick={()=>{changeGame(null); removeGame(game.id); (getGame === "join" && changeGetGame(null))}}>Back</button>
            <br/><br/>
            <h1 style={{display: 'inline'}}>Waiting for a second player</h1>
            {waitingEffect === 1 && <h1 style={{display: 'inline'}}>.</h1>}
            {waitingEffect === 2 && <h1 style={{display: 'inline'}}>..</h1>}
            {waitingEffect === 3 && <h1 style={{display: 'inline'}}>...</h1>}
            <h3>Game options:</h3>
            <p>{`ball speed: ${game.ballspeed}`}</p>
            <p>{`map: ${game.map}`}</p>
          </div>)
}

const JoinGame: React.FC<joinGameProps> = ({ user, changeGetGame, changeGame }) => {
  const [waitingEffect, setWaitingEffect] = useState<number>(0);

  useEffect(()=>{
    const findGame: () => void = async () => {
      const games = await getAllGames();
      let myGame = games.find(game => game.user2 === null);
      if (myGame === undefined) return ;
      myGame.user2 = user;
      await updateGame(myGame.id, { user2: myGame.user2 });
      changeGame(myGame);
    }
    const interval = setInterval(findGame, 2000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    const interval = setInterval(() => {
      setWaitingEffect((prev) => prev === 3 ? 0 : prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [])

  return (<div>
            <button onClick={()=>{changeGetGame(null)}}>Back</button>
            <br/><br/>
            <h1 style={{display: 'inline'}}>Searching Game</h1>
            {waitingEffect === 1 && <h1 style={{display: 'inline'}}>.</h1>}
            {waitingEffect === 2 && <h1 style={{display: 'inline'}}>..</h1>}
            {waitingEffect === 3 && <h1 style={{display: 'inline'}}>...</h1>}
          </div>)
}

const CreateGame: React.FC<createGameProps> = ({ user, changeGetGame, changeGame }) => {
  const [ballSpeed, setBallSpeed] = useState<number>(1);
  const [map, setMap] = useState<string>("black");

  const onSubmit: () => void = async () => {
    const game = await addGame({user1: user, user2: null, ballspeed: ballSpeed, map: map});
    changeGame(game);
  }

  return (<div>
            <button onClick={()=>{changeGetGame(null)}}>Back</button>
            <h1>Create Game</h1>
            <label>Ball Speed: </label><>&nbsp;&nbsp;&nbsp;</>
            <input type="number" step="1" min="1" max="3" value={ballSpeed} onChange={(e)=>setBallSpeed(Number(e.target.value))} required/>
            <br/><br/>
            <label>Map: </label><>&nbsp;&nbsp;&nbsp;</>
            <select onChange={(e)=>setMap(e.target.value)} required>
              {dataBaseMaps.map((item)=> <option>{item}</option>)}
            </select>
            <br/><br/>
            <button type="submit" onClick={()=>onSubmit()}>Create Game</button>
          </div>)
}

const Play: React.FC<playProps> = ({ user, changeMenuPage }) => {
  const [getGame, setGetGame] = useState<"create" | "join" | null>(null);
  const [game, setGame] = useState<GameDto | null>(null);

  const changeGetGame: (page: "create" | "join" | null) => void = (page) => {
    setGetGame(page)
  }

  const changeGame: (newGame: GameDto | null) => void = (newGame) => {
    setGame(newGame);
  }

  if (game !== null && game.user2 !== null) {
    //var gameinfos: GameDto = game;
    return (<div>
              <button onClick={()=>{changeGame(null); changeGetGame(null);}}>Back</button>
              <h1>GAME</h1>
              {<PongGame gameInfos={game}/>/* <GamePong user={user} game={game}/> */}
            </div>);
  } else if (game !== null) {
    return <PreGamePage getGame={getGame} changeGetGame={changeGetGame} game={game} changeGame={changeGame}/>;
  } else if (getGame === null) {
    return (<div>
              <button onClick={()=>{changeMenuPage('home')}}>Back</button>
              <h1>Play Pong</h1>
              <button onClick={()=>changeGetGame("create")}>Create Game</button><>&nbsp;&nbsp;&nbsp;</>
              <button onClick={()=>changeGetGame("join")}>Join Game</button>
            </div>);
  } else if (getGame === "create") {
    return <CreateGame user={user} changeGetGame={changeGetGame} changeGame={changeGame}/>
  } else {
    return <JoinGame user={user} changeGetGame={changeGetGame} changeGame={changeGame}/>
  }
}


export default Play
