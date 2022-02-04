import React, { useState, useEffect } from 'react';
import { GameDto } from "../../api/games/dto/game.dto";
import { UserDto } from "../../api/user/dto/user.dto";
import { getAllUsersRank } from "../../api/user/user.api";
import { getAllGames, getGame } from "../../api/games/games.api";
import styles from "../../css/watch.module.css";
import cs from "../../css/convention.module.css";

interface profileProps {
	back: () => void,
	changeGame: (newGame: GameDto | null) => void
}

const Watch: React.FC<profileProps> = ({ back, changeGame }) => {
  const [activeGames, setActiveGames] = useState<GameDto[]>([]);
	const [rankingUsers, setRankingUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    const getActiveGames: () => void = async () => {
      let games: GameDto[] = await getAllGames();
      games = games.filter((game)=> game.user1.status === "In a game" && game.user2 !== null
        && game.user2.status === "In a game")
      setActiveGames(games);
    }
    getActiveGames(); //Instantly get it when entering page
    const interval = setInterval(getActiveGames, 5000);
		return () => clearInterval(interval);
  }, [])

	useEffect(() => {
		const getRanking: () => void = async () => {
			setRankingUsers((await getAllUsersRank()))
		}
		getRanking();
		const interval = setInterval(getRanking, 5000);
		return () => clearInterval(interval);
	}, [])

  const watchGame: (game: GameDto) => void = async (game) => {
		const latestGame = await getGame(game.id);
    if (latestGame !== null && latestGame.user1.status === "In a game"
      && latestGame.user2 !== null && latestGame.user2.status === "In a game") changeGame(latestGame);
	}

  return (<div>
            <button className={cs.backButton} onClick={()=>{back()}}>Back</button>
						<h2>Ranking</h2>
						{rankingUsers.length > 1 ? rankingUsers.slice(0, 5).map((user: UserDto) => <p>{`${user.login} --- ${user.nbrVicotry} victories`}</p>): "Not enough users"}
            <h1>Watch Live</h1>
            {!activeGames.length ? <p>No Active Games</p> :
              activeGames.map((game)=> <><span className={styles.watchGame} onClick={()=>watchGame(game)}>
              {<><span style={{color: "green"}}>{game.user1.login}</span><span style={{color: "red"}}>{' VS '}</span><span style={{color: "green"}}>{game.user2 !== null && game.user2.login}</span><span>{` --- ballspeed: ${game.ballspeed} --- map: ${game.map}`}</span></>}</span><br/><br/></>)}
          </div>);
}

export default Watch;
