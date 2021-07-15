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

			<FridayMainDisplay gameState={gameState} hazard={currentHazard} hazardOptions={hazardOptions} optionsOnClick={hazardSelectedBtn}
				leftCards={leftSideCards} rightCards={rightSideCards} />

			<PlayerInput gameState={gameState} canDraw={playerDeck.length > 0 || playerDiscard.length > 0} 
				turnClick={nextTurnBtn} drawClick={drawCardBtn} finishClick={finishTurnBtn} />
		</div>
	)

	// Game Logic
	function hazardSelectedBtn(hid) {
		console.log(hid);
	}

	function nextTurnBtn() {
		// Determine next state
		if (hazardDeck.length > 1)
		{
			// draw two hazards and set them as options
			const cards = [];
			cards.push(drawCard(hazardDeck, setHazardDeck));
			cards.push(drawCard(hazardDeck, setHazardDeck));
			setHazardOptions(() => cards);
			setGameState(() => gameStateEnum.SELECTING_HAZARD);
		}
		else if (hazardDeck.length === 1)
		{
			// draw last card and set it as current hazard
			setCurrentHazard(() => drawCard(hazardDeck, setHazardDeck));
			setGameState(() => gameStateEnum.FIGHTING_HAZARD);
		}
		else
		{
			// Game over man to be replaced by difficulty increase and then pirates arrr
			setGameState(() => gameStateEnum.GAME_OVER);
		}
	}

	function drawCardBtn() {
		console.log("draw card");
	}

	function finishTurnBtn() {
		console.log("finish turn");
	}

	function gameOver() {

	}
}

export default FridayGame
