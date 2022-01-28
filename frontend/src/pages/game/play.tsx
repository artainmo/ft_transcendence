import React, { useState, useEffect } from 'react';
import { GameDto } from "../../api/games/dto/game.dto";
import { addGame, getAllGames, getGame as GetGame, removeGame, updateGame } from "../../api/games/games.api";
import { UserDto } from "../../api/user/dto/user.dto";
import { updateUser } from "../../api/user/user.api";
import PongGame from "./gameFunc/PongGame";
import styles from "../../css/play.module.css";
import cs from "../../css/convention.module.css";

const Maps = ['black', 'white', 'winter', 'summer', 'night'];

interface preGamePageProps {
  getGame: "create" | "join" | null
  changeGetGame: (page: "create" | "join" | null) => void
  game: GameDto
  changeGame: (newGame: GameDto | null) => void
}

interface joinGameProps {
  user: UserDto
  changeGetGame: (page: "create" | "join" | null) => void
  changeGame: (newGame: GameDto | null) => void
}

interface createGameProps {
  user: UserDto
  changeGetGame: (page: "create" | "join" | null) => void
  changeGame: (newGame: GameDto | null) => void
}

interface playProps {
	user: UserDto
  changeUser: (newUser: UserDto | null) => void
	changeMenuPage: (newMenuPage: string) => void
  game: GameDto | null
  changeGame: (newGame: GameDto | null) => void
}

const PreGamePage: React.FC<preGamePageProps> = ({ getGame, changeGetGame, game, changeGame }) => {
  const [waitingEffect, setWaitingEffect] = useState<number>(0);

  useEffect(()=>{
    const verifySecondPlayer: () => void = async () => {
      const myGame = await GetGame(game.id);
      if (myGame!.user2 !== null) {
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
            <button className={cs.backButton} onClick={()=>{changeGame(null); removeGame(game.id); (getGame === "join" && changeGetGame(null))}}>Back</button>
            <br/><br/>
            <h1 style={{display: 'inline'}}>Waiting for a second player</h1>
            {waitingEffect === 1 && <h1 style={{display: 'inline'}}>.</h1>}
            {waitingEffect === 2 && <h1 style={{display: 'inline'}}>..</h1>}
            {waitingEffect === 3 && <h1 style={{display: 'inline'}}>...</h1>}
            <br/><br/>
            <h3>Game options:</h3>
            <span style={{color:"#507255"}}>ball speed: </span><span style={{color:"#4AAD52"}}>{game.ballspeed}</span>
            <br/><br/>
            <span style={{color:"#507255"}}>map: </span><span style={{color:"#4AAD52"}}>{game.map}</span>
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
            <button className={cs.backButton} onClick={()=>{changeGetGame(null)}}>Back</button>
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

  return (<>
            <button className={cs.backButton} onClick={()=>{changeGetGame(null)}}>Back</button>
            <h1>Create Game</h1>
            <label>Ball Speed: </label>
            <input className={cs.customSelect} type="number" step="1" min="1" max="3" value={ballSpeed} onChange={(e)=>setBallSpeed(Number(e.target.value))} required/>
            <br/><br/>
            <label>Map: </label>
              <select className={cs.customSelect} onChange={(e)=>setMap(e.target.value)} required>
                {Maps.map((item)=> <option>{item}</option>)}
              </select>
            <br/><br/>
            <button className={styles.createGameButton2} type="submit" onClick={()=>onSubmit()}>Create Game</button>
          </>)
}

const Play: React.FC<playProps> = ({ user, changeUser, changeMenuPage, game, changeGame }) => {
  const [getGame, setGetGame] = useState<"create" | "join" | null>(null);
  updateUser(user.id, {status: "Searching a game"});

  const changeGetGame: (page: "create" | "join" | null) => void = (page) => {
    setGetGame(page)
  }

  const quitGame: () => void = async () => {
    if (game === null) return ;
    await removeGame(game.id);
    await updateUser(user.id, {status: "Online"});
    changeGame(null);
    changeGetGame(null);
  }

  if (game !== null && game.user2 !== null) {
    if (game.user1.id === user.id || game.user2.id === user.id) {
      updateUser(user.id, {status: "In a game"});
    } else {
      updateUser(user.id, {status: "Watching a game"});
    }
    return (<PongGame gameInfos={game} user={user} changeUser={changeUser} back={quitGame}/>);
  } else if (game !== null) {
    return <PreGamePage getGame={getGame} changeGetGame={changeGetGame} game={game} changeGame={changeGame}/>;
  } else if (getGame === null) {
    return (<div>
              <button className={cs.backButton} onClick={()=>{changeMenuPage('home')}}>Back</button>
              <h1>Play Pong</h1>
              <button className={styles.createGameButton} onClick={()=>changeGetGame("create")}>Create Game</button><>&nbsp;&nbsp;</>
              <button className={styles.joinGameButton} onClick={()=>changeGetGame("join")}>Join Game</button>
            </div>);
  } else if (getGame === "create") {
    return <CreateGame user={user} changeGetGame={changeGetGame} changeGame={changeGame}/>
  } else {
    return <JoinGame user={user} changeGetGame={changeGetGame} changeGame={changeGame}/>
  }
}


export default Play
