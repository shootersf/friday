import { useState } from 'react'

import LeftSideInfo from './LeftSideInfo'
import RightSideInfo from './RightSideInfo'
import FridayMainDisplay from './FridayMainDisplay'
import PlayerInput from './PlayerInput'

import { drawCard, createDeck, createHazardDeck } from '../helpers'
import { TOTAL_LIVES, gameStateEnum } from '../constants'

import starterCards from '../data/starterFightingCards.json'
import hCards from '../data/hazardCards.json'
import advancedCards from '../data/advancedFightingCards.json'





const FridayGame = () => {

	// Initial state for game
	const [playerDeck, setPlayerDeck] = useState( () => createDeck(0, starterCards));
	const [playerDiscard, setPlayerDiscard] = useState([]);
	const [hazardDeck, setHazardDeck] = useState( () => createHazardDeck(18, advancedCards, hCards));
	const [hazardDiscard, setHazardDisard] = useState([]);
	const [exile, setExile] = useState([]);
	const [hazardOptions, setHazardOptions] = useState([]);
	const [currentHazard, setCurrentHazard] = useState({});
	const [leftSideCards, setLeftSideCards] = useState([]);
	const [rightSideCards, setRightSideCards] = useState([]);
	const [freeCardsRemaining, setFreeCardsRemaining] = useState(0);
	const [tougnessRemaining, setToughnessRemaining] = useState(0);
	const [livesRemaining, setLivesRemaining] = useState(TOTAL_LIVES);
	const [gameState, setGameState] = useState(gameStateEnum.TURN_OVER);

	
	return (
		<div className="friday-game">
			<h1>Testing this react thing</h1>
			<h2>Hello2</h2>
			<LeftSideInfo deckSize={playerDeck.length} discardSize={playerDiscard.length} remainingLives={livesRemaining} />
			
			<RightSideInfo deckSize={hazardDeck.length} discardSize={hazardDiscard.length} freeCardsRemaining={freeCardsRemaining}
				toughnessRemaining={tougnessRemaining} fighting={gameState === gameStateEnum.FIGHTING_HAZARD} />

			<FridayMainDisplay gameState={gameState} hazard={currentHazard} hazardOptions={hazardOptions} optionsOnClick={hazardSelected}
				leftCards={leftSideCards} rightCards={rightSideCards} />

			<PlayerInput gameState={gameState} canDraw={playerDeck.length > 0 || playerDiscard.length > 0} 
				turnClick={nextTurn} drawClick={drawCard} finishClick={finishTurn} />
			{/* <Deck name="Player" count={playerDeck.length} />
			<Deck name="Hazard" count={hazardDeck.length} /> */}
			{/* <HazardSelection options={hazardOptions} onClick={hazardSelected}/> */}
			{/* <FightingCard {...playerDeck[17]}/>
			<br>
			</br>
			<HazardCard {...hazardDeck[0]} /> */}
		</div>
	)

	// Game Logic
	function hazardSelected(hid) {
		console.log(hid);
	}

	function nextTurn() {
		console.log("new Turn");
	}

	function drawCard() {
		console.log("draw card");
	}

	function finishTurn() {
		console.log("finish turn");
	}
}

export default FridayGame
